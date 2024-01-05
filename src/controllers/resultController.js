const Student = require("../models/student")
const createError = require('http-errors')
const { gradingSystem, calculateGPA, calculateGradeAndPoints, calculateTotalMarks, calculateTotalGrade } = require('../helper/resultCalculation')
const { nameOfClass: classnameList, sakha: nameOfSakha } = require('../models/data.json')
const Result = require("../models/result")
const { successMessage } = require("../helper/successMessage")
const { nextIndex } = require("../helper/nextIndx")

const createResult = async (req, res, next) => {
    try {
        const { exam_name, exam_year, nameOfClass, roll, subjects, total_examinee, sakha } = req.body
        const isSameSubject = await Result.findOne({ exam_name, exam_year, nameOfClass })
        if (isSameSubject) {
            if (isSameSubject.subjects.length !== subjects.length) {
                throw createError(400, `you recently added ${isSameSubject.subjects.length} subject and now you want to add ${subjects.length} subject which not allowed`)
            }
            const dbsubjects = []
            const inputedSubjects = []
            isSameSubject.subjects.map((subject) => dbsubjects.push(subject.subject))
            subjects.map((subject) => inputedSubjects.push(subject.subject))
            if (JSON.stringify(dbsubjects) !== JSON.stringify(inputedSubjects)) {
                throw createError(400, `
                 ${JSON.stringify(dbsubjects)} please add those subjects and mantain the order `)
            }
        }
        const countREsult = await Result.find({ exam_name, exam_year, nameOfClass }).countDocuments()
        if (countREsult && isSameSubject && countREsult === isSameSubject.total_examinee) {
            throw createError(400, 'all results has been added')
        }
        const isAlreadyExist = await Result.exists({ exam_name, exam_year, nameOfClass, roll })
        if (isAlreadyExist) { throw createError(400, 'result already exist') }
        const student = await Student.findOne({ nameOfClass: nameOfClass, roll, academic_year: exam_year, sakha })

        if (!student) { throw createError(404, 'student not found') }
        const { name, name_bangla, father_name_bangla, mother_name_bangla, date_of_birth, student_id, gender, group } = student


        const resultWithGradeAndPoint = subjects.map((subject) => {
            const { grade, point } = calculateGradeAndPoints(Number(subject.marks));
            return {
                ...subject,
                grade,
                point
            };
        });

        const totalMarks = calculateTotalMarks(subjects);
        const gpa = calculateGPA(resultWithGradeAndPoint);
        const grade = calculateTotalGrade(gpa)
        const status = gpa >= 2.00 ? 'Passed' : 'Failed';
        const avarage_marks = (totalMarks / subjects.length).toFixed(2);
        const { grade: avarage_grade, point: avarage_point } = calculateGradeAndPoints(avarage_marks);
        const data = {

            student_id,
            nameOfClass,
            exam_name,
            exam_year,
            total_examinee,
            roll,
            name, name_bangla, father_name_bangla, mother_name_bangla, date_of_birth, student_id, gender, sakha, group,

            subjects: resultWithGradeAndPoint, total_marks: Number(totalMarks),
            avarage_marks,
            avarage_point,
            avarage_grade,
            gpa: gpa.toFixed(2),
            grade,
            status
        }
        const createdResult = await Result.create(data)
        if (!createdResult) { throw createError(400, 'failed to create result') }
        successMessage(res, 201, 'created sucessfully', createResult)

    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }


}

const getUnpublishResults = async (req, res, next) => {
    try {

        const classes = []
        nameOfSakha.map((singleSakha) => {
            classnameList.map((className) => {
                classes.push({ nameOfClass: className, sakha: singleSakha })
            })
        })

        const unpublishedResult = []


        for (const singleClass of classes) {
            const results = await Result.findOne(singleClass).and({ published: false })
            if (results) {

                unpublishedResult.push({ exam_year: results.exam_year, exam_name: results.exam_name, nameOfClass: results.nameOfClass, sakha: results.sakha, total_examinee: results.total_examinee, id: results._id, exam_year: results.exam_year })
            }
        }


        if (unpublishedResult.length > 0) {
            successMessage(res, 200, 'success', unpublishedResult)
        } else {
            throw createError(404, 'No unpublish results found')
        }

    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })
    }
}
const publishResult = async (req, res, next) => {
    try {
        // Destructure request body
        const { exam_year, exam_name, nameOfClass, sakha } = req.body;

        // Check if required fields are provided in req.body
        if (!exam_year || !exam_name || !nameOfClass, !sakha) {
            throw createError('Required fields (exam_year, exam_name, nameOfClass) missing in the request body');
        }

        // Find all results for the specified exam details and sort by total_marks in descending order
        const results = await Result.find({ exam_year, exam_name, nameOfClass, sakha, published: false }).sort({ total_marks: -1 });


        // Check if results are not found
        if (!results || results.length === 0) {
            throw createError(404, 'No results found for the specified exam details');
        }
        if (results.length < results[0].total_examinee) {
            throw createError(400, `add all result before publish , you missed ${results[0].total_examinee - results.length} result`)
        }
        // Update the published field to true for all results
        const updateResult = await Result.updateMany({ exam_year, exam_name, nameOfClass, sakha }, { published: true, position: 0 });

        if (!updateResult || updateResult.nModified === 0) {
            throw createError('Failed to update');
        }

        // Separate passed and failed results
        const passedResults = results.filter(result => result.grade !== 'F');
        const failedResults = results.filter(result => result.grade === 'F');


        // Update failed student roll to 0
        if (results.exam_name === "বার্ষিক পরীক্ষা") {
            await Student.updateMany({ academic_year: exam_year, nameOfClass, sakha }, { roll: null });
        }

        // Recalculate positions and update student data
        let position = 0;
        if (passedResults.length > 0) {
            for (const result of passedResults) {
                position++;
                result.position = position;
                result.best_marks = passedResults[0].total_marks

                if (result.exam_name === "বার্ষিক পরীক্ষা") {
                    await Student.findOneAndUpdate(
                        { student_id: result.student_id },
                        { roll: position, nameOfClass: nextIndex(result.nameOfClass, classnameList), academic_year: new Date().getFullYear(exam_year) + 1 }
                    );
                }

                await result.save();
            }
        }
        if (failedResults.length > 0) {
            for (const result of failedResults) {


                result.best_marks = passedResults.length > 0 ? passedResults[0].total_marks : failedResults[0].total_marks
               

                if (result.exam_name === "বার্ষিক পরীক্ষা") {
                    await Student.findOneAndUpdate(
                        { student_id: result.student_id },
                        { roll: 0 }
                    );

                }

                await result.save();
            }
        }




        successMessage(res, 201, 'Results published and positions recalculated successfully', { passedResults });
    } catch (error) {
        console.log(error);
        next({ common: { msg: error.message }, status: error.status || 500 });
    }
};

const getResult = async (req, res, next) => {
    try {
        const { student_id, exam_year, exam_name } = req.body

        const result = await Result.findOne({
            student_id, exam_name, exam_year, published: true
        })
        if (!result) { throw createError(400, "invalid information") }





        successMessage(res, 200, 'success', [result])

    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}

const getAllresultUser = async (req, res, next) => {
    try {
        // Extract request body parameters
        const { exam_name, exam_year, nameOfClass } = req.body;

        // Check if required fields are present
        if (!exam_year || !exam_name || !nameOfClass) {
            throw createError('Required fields (exam_year, exam_name, nameOfClass) missing in the request body');
        }

        // Query the database to get results for the specified exam details
        const results = await Result.find({
            exam_year,
            exam_name,
            nameOfClass,

        }).sort({ roll: 1 }).and({ published: true });

        // Check if results were found
        if (results.length > 0) {
            // Prepare response with results and pagination information
            const count = results.length;

            successMessage(res, 200, 'success', results)
        } else {
            // If no results found, throw an error
            throw createError('No results found for the specified exam details');
        }
    } catch (error) {
        // Handle errors and pass them to the error handling middleware
        next({
            common: { msg: error.message },
            status: error.status || 404
        });
    }
};
const getAllresultAdmin = async (req, res, next) => {
    try {
        const { exam_name, exam_year, nameOfClass, sakha, search } = req.query;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;






        const filter = {};

        if (exam_name) filter.exam_name = exam_name;
        if (exam_year) filter.exam_year = exam_year;
        if (nameOfClass) filter.nameOfClass = nameOfClass;
        if (sakha) filter.sakha = sakha;
        if (search) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const searchRegExp = new RegExp(".*" + escapedSearch + ".*", "i");
            filter.$or = [
                { student_id: searchRegExp },
                { name: searchRegExp },
                { name_bangla: searchRegExp }
            ];
        }

        const results = await Result.find(Object.keys(filter).length > 0 ? filter : {}).sort({ createdAt: - 1 }).skip((page - 1) * limit).limit(limit)



        if (Object.keys(results).length > 0) {
            const count = await Result.find(filter).countDocuments();
            console.log(results);
            successMessage(res, 200, "success", {
                results,
                pagination: {
                    totalDocument: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                },
            })



        } else {
            // If no results found, throw an error
            throw createError('No results found for the specified exam details');
        }
    } catch (error) {
        console.log(error);
        // Handle errors and pass them to the error handling middleware
        next({
            common: { msg: error.message },
            status: error.status || 404
        });
    }
};

const deleteResult = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) { throw createError(400, 'something is missing') }

        const result = await Result.findOneAndDelete({ _id: id, published: false })
        if (result) {
            successMessage(res, 200, 'successfully deleted')
        } else {
            throw createError(200, 'failed to delete results')
        }
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}
module.exports = { createResult, getResult, publishResult, getAllresultAdmin, getAllresultUser, deleteResult, getUnpublishResults }
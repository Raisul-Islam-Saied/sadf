const createError = require("http-errors");
const { successMessage } = require("../helper/successMessage");
const Syllabus = require("../models/syllabus");

const addSyllabus = async (req, res, next) => {
    try {
        const { nameOfClass, exam_year } = req.body;
        const isAlreadyExist = await Syllabus.findOne({ nameOfClass, exam_year })

        if (isAlreadyExist) {
            throw createError(400, "this syllabus is already exist")
        }
        if (!req.files[0]) {
            throw createError("file is required")
        }
        let syllabus_url = ''
        if (req.files && req.files[0]) {
            syllabus_url = req.files[0].filename
        }


        const syllabus = await Syllabus.create(
            {
                nameOfClass, exam_year, syllabus:
                    syllabus_url
            }
        )


        if (syllabus) {
            successMessage(res, 201, 'successfully uploaded', syllabus)
        } else {
            throw createError(400, 'failed to registerd')
        }
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}
//get single user by id
const getStudent = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await Student.findOne({ student_id: id, })
        if (!user) {
            throw createError(404, 'student not found')
        }
        successMessage(res, 200, 'success', user)
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}

//get all user by 
const getSyllabus = async (req, res, next) => {
    try {
        const nameOfClass = req.query.nameOfClass || "";
        const exam_year = req.query.exam_year || "";

        const filter = {};


        if (exam_year) filter.exam_year = exam_year;
        if (nameOfClass) filter.nameOfClass = nameOfClass;

        const syllabus = await Syllabus.find(filter)

        if (Object.keys(syllabus).length >= 1) {

            successMessage(res, 200, "success", {
                syllabus,

            });
        } else {
            throw createError(404, "syllabus not found");
        }
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })
    }
}
const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await Student.findOne({ _id: id })

        if (!user) {
            throw createError(404, 'we did not found student with this information')
        }
        const updateOptions = {
            new: true,
            runValidators: true,
            context: "query",
        };

        const updates = {};

        for (let key in req.body) {
            if (['guardian_name', 'guardian_phone', 'guardian_email', 'guardian_name_bangla', 'phone', 'address', 'nameOfClass', 'sakha', 'roll', 'group', 'academic_year'].includes(key)) {
                updates[key] = req.body[key];
            }
        }
        if (req.files && req.files.length > 0) {
            updates.avatar = req.files[0].buffer.toString("base64");
        }
        if (!Object.keys(updates).length > 0) {
            throw createError(400, 'nothing to update')

        }
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            updates,
            updateOptions
        );
        if (!updatedStudent) {
            throw createError(400, 'failed to update information')
        }
        successMessage(res, 200, 'updated successfully', updatedStudent)
    } catch (error) {
        next({
            common:
            {
                msg: error.message
            }
        })
    }
}


const deleteStudent = async (req, res, next) => {
    try {

        const id = req.params.id
        const user = await Student.findByIdAndDelete({ _id: id })
        if (user) {
            successMessage(res, 200, 'successfully deleted', user)
        } else {
            throw createError(400, 'failed to delete account')
        }


    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}





module.exports = { addSyllabus, getSyllabus, getStudent, updateStudent, deleteStudent }
const createError = require("http-errors");
const { successMessage } = require("../helper/successMessage");
const Student = require("../models/student");
const { setNodeCache } = require("../helper/nodeCache");
const cloudinary = require('../config/cloudinary')


const addStudent = async (req, res, next) => {
    try {
        const { student_id, birth_no, name, name_bangla, father, mother, guardian, date_of_birth, religion, phone, email, address, gender, nameOfClass, sakha, date_of_admission, roll, group, blood_group, academic_year, address_bn } = req.body;



        let avatar = null;

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                if (file.fieldname === 'student_image') {
                    const response = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
                        folder: 'test',
                    });



                    avatar = response.url;
                    break;
                }
            }
        }


        if (!avatar) {
            throw createError(400, "Student image is required");
        }










        const student_data = { student_id, birth_no, name, name_bangla, father, mother, guardian, date_of_birth, religion, phone, address, email, gender, nameOfClass, sakha, date_of_admission, roll, group, blood_group, academic_year, avatar, address_bn }

        const user = await Student.create(student_data)

        if (user) {



            successMessage(res, 201, 'successfully registered', user)
        } else {
            throw createError(400, 'failed to registerd')
        }
    } catch (error) {
        console.log(error);
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
const getAllStudents = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const searchRgeExp = new RegExp(".*" + escapedSearch + ".*", "i");


        const filter = {

            $or: [
                { name: searchRgeExp },
                { student_id: searchRgeExp },
                { name_bangla: searchRgeExp }
            ]
        }

        const student = await Student.find(filter).skip(page - 1).limit(limit).sort({ name: 'descending' })

        if (Object.keys(student).length >= 1) {
            const count = await Student.find(filter).countDocuments();
            successMessage(res, 200, "success", {
                student,
                pagination: {
                    totalDocument: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                },
            });
        } else {
            throw createError(404, "student not found");
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





module.exports = { addStudent, getAllStudents, getStudent, updateStudent, deleteStudent }
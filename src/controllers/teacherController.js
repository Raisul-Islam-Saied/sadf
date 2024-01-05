const createError = require("http-errors");
const { successMessage } = require("../helper/successMessage");
const Teacher = require("../models/teacher");


const addTeacher = async (req, res, next) => {
    try {
        const { teacher_id, birth_no, nid_no, name, name_bangla, father_name, father_name_bangla, mother_name, mother_name_bangla, email, date_of_birth, religion, phone, address, gender, date_of_join, education_institute_name, blood_group, } = req.body;

        let avatar = null;

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                if (file.fieldname === 'teacher_image') {
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
        const teacher_data = { teacher_id, birth_no, nid_no, name, name_bangla, father_name, father_name_bangla, mother_name, mother_name_bangla, email, date_of_birth, religion, phone, address, gender, date_of_join, education_institute_name, blood_group, avatar }
        const user = await Teacher.create(teacher_data)
        if (user) {
            successMessage(res, 201, 'successfully registered', user)

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
const getTeacher = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await Teacher.findOne({ teacher_id: id, })
        if (!user) {
            throw createError(404, 'teacher not found')
        }
        successMessage(res, 200, 'success', { user })
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })

    }
}

//get all user by 
const getAllTeacher = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const searchRgeExp = new RegExp(".*" + escapedSearch + ".*", "i");


        const filter = {

            $or: [
                { name: searchRgeExp },
                { teacher_id: searchRgeExp },
                { name_bangla: searchRgeExp }
            ]
        }

        const teacher = await Teacher.find(filter).skip(page - 1).limit(limit).sort({ name: 'descending' })

        if (Object.keys(teacher).length >= 1) {
            const count = await Teacher.find(filter).countDocuments();
            successMessage(res, 200, "success", {
                teacher,
                pagination: {
                    totalDocument: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                },
            });
        } else {
            throw createError(404, "teacher not found");
        }
    } catch (error) {
        next({
            common: {
                msg: error.message
            }
        })
    }
}
const updateTeacher = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await Teacher.findOne({ _id: id })

        if (!user) {
            throw createError(404, 'we did not found teacher with this information')
        }
        const updateOptions = {
            new: true,
            runValidators: true,
            context: "query",
        };

        const updates = {};

        for (let key in req.body) {
            if (['email', 'phone', 'address', 'education_institute_name',].includes(key)) {
                updates[key] = req.body[key];
            }
        }
        if (req.files && req.files.length > 0) {
            updates.avatar = req.files[0].buffer.toString("base64");
        }
        if (!Object.keys(updates).length > 0) {
            throw createError(400, 'nothing to update')

        }
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            updates,
            updateOptions
        );
        if (!updatedTeacher) {
            throw createError(400, 'failed to update information')
        }
        successMessage(res, 200, 'updated successfully', updatedTeacher)
    } catch (error) {
        next({
            common:
            {
                msg: error.message
            }
        })
    }
}


const deleteTeacher = async (req, res, next) => {
    try {

        const id = req.params.id
        const user = await Teacher.findByIdAndDelete({ _id: id })
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





module.exports = { addTeacher, getAllTeacher, getTeacher, updateTeacher, deleteTeacher }
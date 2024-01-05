const express = require("express");
const runValidators = require("../validators");
const avatarUploader = require("../helper/avatarUploader");
const { addTeacherValidation, updateTeacherValidation } = require("../validators/teacherValidatior");
const { addTeacher, getAllTeacher, getTeacher, updateTeacher, deleteTeacher } = require("../controllers/teacherController");

const teacherRouter = express.Router();

//add user 
teacherRouter.post("/add_teacher", avatarUploader, addTeacherValidation, runValidators, addTeacher);
teacherRouter.get('/', getAllTeacher)
teacherRouter.get('/:id', getTeacher)
teacherRouter.put('/update/:id', avatarUploader, updateTeacherValidation, runValidators, updateTeacher)
teacherRouter.delete('/delete/:id', deleteTeacher)

module.exports = teacherRouter;

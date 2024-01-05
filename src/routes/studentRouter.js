const express = require("express");

const runValidators = require("../validators");
const { addUser, updateUser, deleteUser, banUserById, unbanUserById, updatePassword, resetPasswordRequset, resetPassword, getUser, getUsers } = require("../controllers/userController");
const avatarUploader = require("../helper/avatarUploader");
const { addUserValidators, updataUserValidators, updatePasswordValidators, resetPasswordRequestValidation, resetPasswordValidators } = require("../validators/userValidation");
const { addStudentValidation, updateStudentValidation } = require("../validators/studentValidation");
const { addStudent, getAllStudents, getStudent, updateStudent, deleteStudent } = require("../controllers/studentController");

const studentRouter = express.Router();

//add user 
studentRouter.post("/add_student", avatarUploader, addStudentValidation, runValidators, addStudent);
studentRouter.get('/', getAllStudents)
studentRouter.get('/:id', getStudent)
studentRouter.put('/update/:id', avatarUploader, updateStudentValidation, runValidators, updateStudent)
studentRouter.delete('/delete/:id', deleteStudent)

module.exports = studentRouter;

const express = require("express");

const runValidators = require("../validators");
const { addUser, updateUser, deleteUser, banUserById, unbanUserById, updatePassword, resetPasswordRequset, resetPassword, getUser, getUsers } = require("../controllers/userController");
const avatarUploader = require("../helper/avatarUploader");
const { addUserValidators, updataUserValidators, updatePasswordValidators, resetPasswordRequestValidation, resetPasswordValidators } = require("../validators/userValidation");
const { addStudentValidation, updateStudentValidation } = require("../validators/studentValidation");
const { addStudent, getAllStudents, getStudent, updateStudent, deleteStudent } = require("../controllers/studentController");
const pdfUploader = require("../helper/pdfUploader");
const { addSyllabus, getSyllabus } = require("../controllers/syllabus");

const syllabusRouter = express.Router();

//add user 
syllabusRouter.post("/add_syllabus", pdfUploader, addSyllabus);
syllabusRouter.get("/get_syllabus", getSyllabus);

module.exports = syllabusRouter;

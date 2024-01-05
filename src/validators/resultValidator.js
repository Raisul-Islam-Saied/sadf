const { check, } = require('express-validator');
const createError = require('http-errors');
const Student = require('../models/student');
const { exam_name, nameOfClass, sakha } = require('../models/data.json')
const addResultValidator = [



  check('subjects').notEmpty().isArray().custom((v) => {
    if (v.length >= 1) {
      return true
    } else {
      throw createError(400, 'require minimum 1 subjects')
    }
  }),
  check('exam_name').notEmpty().withMessage('exam name is required').isIn(exam_name).withMessage('invalid exam name'),
  check('exam_year').notEmpty().isInt().isLength({ min: 4, max: 4 }).custom((v) => {
    const currenYear = new Date().getFullYear()
    if (Number(currenYear) < v) {
      throw createError(400, 'you can not add result before exam 😊')
    }
    else {
      return true
    }
  }),
  check("total_examinee").notEmpty().withMessage('total examinne is required filed').isInt().isLength({ min: 1 }).withMessage('total_examinee must be 1'),
  check('roll')
    .notEmpty().withMessage('Roll is required')
    .isInt().withMessage('Roll must be an integer')
    .isLength({ min: 1, max: 1000 }).withMessage('Roll must be 1 to 1000 characters'),
  check('sakha')
    .trim()
    .notEmpty().withMessage('Sakha is required')
    .isIn(sakha).withMessage('Invalid sakha'),
  check('nameOfClass')
    .trim()
    .notEmpty().withMessage('Class name is required')
    .isLength({ min: 2, max: 30 }).withMessage('Class name must be 2 to 30 characters')
    .isIn(nameOfClass).withMessage('Invalid class name'), check('subjects.*.subject')
      .trim()
      .notEmpty()
      .withMessage('Subject are required')
      .isLength({ max: 100 })
      .withMessage('Subject can have a maximum length of 100 characters'),

  check('subjects.*.marks')
    .notEmpty()
    .withMessage('Marks are required')
    .isInt({ min: 0, max: 100 })
    .withMessage('Marks must be an integer between 0 and 100'),


  // check('totalMarks')
  //   .notEmpty()
  //   .withMessage('Total marks are required')
  //   .isInt({ min: 0 })
  //   .withMessage('Total marks must be a non-negative integer'),

  // check('totalCredits')
  //   .notEmpty()
  //   .withMessage('Total credits are required')
  //   .isInt({ min: 0 })
  //   .withMessage('Total credits must be a non-negative integer'),

  // check('gpa')
  //   .notEmpty()
  //   .withMessage('GPA is required')
  //   .isFloat({ min: 0 })
  //   .withMessage('GPA must be a non-negative float'),

  // check('totalGrade')
  //   .trim()
  //   .notEmpty()
  //   .withMessage('Total grade is required'),

  // check('passedSubjects')
  //   .notEmpty()
  //   .withMessage('Passed subjects count is required')
  //   .isInt({ min: 0 })
  //   .withMessage('Passed subjects count must be a non-negative integer'),

  // check('failedSubjects')
  //   .notEmpty()
  //   .withMessage('Failed subjects count is required')
  //   .isInt({ min: 0 })
  //   .withMessage('Failed subjects count must be a non-negative integer'),


  // check('attendancePercentage')
  //   .notEmpty()
  //   .withMessage('Attendance percentage is required')
  //   .isFloat({ min: 0 })
  //   .withMessage('Attendance percentage must be a non-negative float'),








];
const publishedResultValidation = [
  check('exam_name').notEmpty().withMessage('exam name is required').isIn(exam_name).withMessage('invalid exam name'),
  check('exam_year').notEmpty().isInt().isLength({ min: 4, max: 4 }),
  check('nameOfClass')
    .trim()
    .notEmpty().withMessage('Class name is required')
    .isLength({ min: 2, max: 30 }).withMessage('Class name must be 2 to 30 characters')
    .isIn(nameOfClass).withMessage('Invalid class name'),

  check('sakha')
    .trim()
    .notEmpty().withMessage('Sakha is required')
    .isIn(sakha).withMessage('Invalid sakha'),

]
const getResultsValidation = [
  check('exam_name').notEmpty().withMessage('exam name is required').isIn(exam_name).withMessage('invalid exam name'),
  check('exam_year').notEmpty().isInt().isLength({ min: 4, max: 4 }),
  check('nameOfClass')
    .trim()
    .notEmpty().withMessage('Class name is required')
    .isLength({ min: 2, max: 30 }).withMessage('Class name must be 2 to 30 characters')
    .isIn(nameOfClass).withMessage('Invalid class name'),

]

const getResultValidation = [
  check('exam_name').notEmpty().withMessage('exam name is required').isIn(exam_name).withMessage('invalid exam name'),
  check('exam_year').notEmpty().isInt().isLength({ min: 4, max: 4 }),
  check('student_id')
    .trim()
    .notEmpty()
    .withMessage('Student ID is required')
    .isLength({ min: 10, max: 10 },)
    .withMessage('Student ID can have a  10 characters')
  ,



]


module.exports = { addResultValidator, publishedResultValidation,  getResultsValidation, getResultValidation }
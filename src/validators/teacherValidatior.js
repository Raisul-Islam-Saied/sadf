const { check, validationResult } = require('express-validator');
const { nameOfClass, sakha, blood_group, gender, group, religion } = require("../models/data.json");

const createError = require('http-errors');
const Teacher = require('../models/teacher');

const addTeacherValidation = [
    check("teacher_id").isLength({ min: 8, max: 8 }).withMessage('id must be 8 character').custom(async (value) => {
        try {
            const id = await Teacher.exists({ teacher_id: value });
            if (id) {
                throw createError("teacher id already is exist!");
            }
        } catch (err) {
            throw createError(err.message);
        }
    }),
    check('birth_no').isInt().withMessage('birth certificate number must be an integer').isLength({ min: 17, max: 17 }).withMessage('birth certificate number must be 17 character').custom(async (value) => {
        try {
            const number = await Teacher.exists({ birth_no: value });
            if (number) {
                throw createError("birth certificate number already exist!");
            }
        } catch (err) {
            throw createError(err.message);
        }
    }),
    check('nid_no').optional().isInt().withMessage('birth certificate number must be an integer').custom(async (value) => {
        try {
            const number = await Teacher.exists({ nid_no: value });
            if (number) {
                throw createError("nid number already exist!");
            }
        } catch (err) {
            throw createError(err.message);
        }
    }),
    check('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 30 }).withMessage('Name must be 3 to 30 characters')
        .isAlpha('en-US', { ignore: ' -' }).withMessage('Name must only contain alphabets'),

    check('name_bangla') 
        .trim()
        .notEmpty().withMessage('Bangla name is required')
        .isLength({ min: 3, max: 30 }).withMessage('Bangla name must be 3 to 30 characters')
        .isAlpha('bn-BD', { ignore: ' -' }).withMessage('Bangla name must only contain Bengali alphabets'),
    check('father_name')
        .trim()
        .notEmpty().withMessage("Father's name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Father's name must be 3 to 30 characters")
        .isAlpha('en-US', { ignore: ' -' }).withMessage("Father's name must only contain alphabets"),

    check('father_name_bangla')
        .trim()
        .notEmpty().withMessage("Father's Bangla name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Father's Bangla name must be 3 to 30 characters")
        .isAlpha('bn-BD', { ignore: ' -' }).withMessage("Father's Bangla name must only contain Bengali alphabets"),

    check('mother_name')
        .trim()
        .notEmpty().withMessage("Mother's name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Mother's name must be 3 to 30 characters")
        .isAlpha('en-US', { ignore: ' -' }).withMessage("Mother's name must only contain alphabets"),

    check('mother_name_bangla')
        .trim()
        .notEmpty().withMessage("Mother's Bangla name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Mother's Bangla name must be 3 to 30 characters")
        .isAlpha('bn-BD', { ignore: ' -' }).withMessage("Mother's Bangla name must only contain Bengali alphabets"),


    check('email')
        .isEmail().withMessage("Invalid email format"),
    check('date_of_birth')
        .notEmpty().withMessage('Date of birth is required')
        .isDate().withMessage('Invalid date format for date of birth'),

    check('religion')
        .trim()
        .notEmpty().withMessage('Religion is required')
        .isIn(religion)
        .withMessage('Invalid religion'),
    check('phone')
        .notEmpty().withMessage('Phone is required')
        .isMobilePhone("bn-BD", {
            strictMode: true,
        }).withMessage('Phone must be a valid Bangladeshi mobile number'),


    check('address')
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 5, max: 200 }).withMessage('Address must be 5 to 200 characters'),

    check('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(gender)
        .withMessage('Invalid gender'),




    check('date_of_join')
        .notEmpty().withMessage('Date of join is required')
        .isDate().withMessage('Invalid date format for date of join'),
    check('education_institute_name')
        .notEmpty().isLength({ min: 3, max: 50 }).withMessage('education institute name must be 3 to 50 character'),

    check('blood_group')
        .notEmpty().withMessage('Blood group is required')
        .isIn(blood_group)
        .withMessage('Invalid blood group'),

];
const updateTeacherValidation = [


    check('email')
        .optional()
        .isEmail().withMessage("Invalid email format"),
    check('phone')
        .optional()
        .notEmpty().withMessage('Phone is required')
        .isMobilePhone("bn-BD", {
            strictMode: true,
        }).withMessage('Phone must be a valid Bangladeshi mobile number'),

    check('education_institute_name')
        .optional()
        .notEmpty().isLength({ min: 3, max: 50 }).withMessage('education institute name must be 3 to 50 character'),
    check('address')
        .optional()
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 5, max: 200 }).withMessage('Address must be 5 to 200 characters'),

];
module.exports = { addTeacherValidation, updateTeacherValidation };

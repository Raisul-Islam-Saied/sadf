// const { check, validationResult } = require('express-validator');
// const { nameOfClass, sakha, blood_group, gender, group, religion } = require("../models/data.json");
// const Student = require('../models/student');
// const createError = require('http-errors');

// const addStudentValidation = [
//     check("student_id").isLength({ min: 10, max: 10 }).withMessage('id must be 10 character').custom(async (value) => {
//         try {
//             const id = await Student.exists({ student_id: value });
//             if (id) {
//                 throw createError("student id already is exist!");
//             }
//         } catch (err) {
//             throw createError(err.message);
//         }
//     }),
//     check('birth_no').isLength({ min: 17, max: 17 }).withMessage('birth certificate number must be 17 character').custom(async (value) => {
//         try {
//             const number = await Student.exists({ birth_no: value });
//             if (number) {
//                 throw createError("birth certificate number already exist!");
//             }
//         } catch (err) {
//             throw createError(err.message);
//         }
//     }),
//     check('name')
//         .trim()
//         .notEmpty().withMessage('Name is required')
//         .isLength({ min: 3, max: 30 }).withMessage('Name must be 3 to 30 characters')
//         .isAlpha('en-US', { ignore: ' -' }).withMessage('Name must only contain alphabets'),

//     check('name_bangla')
//         .trim()
//         .notEmpty().withMessage('Bangla name is required')
//         .isLength({ min: 3, max: 30 }).withMessage('Bangla name must be 3 to 30 characters')
//         .isAlpha('bn-BD', { ignore: ' -' }).withMessage('Bangla name must only contain Bengali alphabets'),
//     check('father_name')
//         .trim()
//         .notEmpty().withMessage("Father's name is required")
//         .isLength({ min: 3, max: 30 }).withMessage("Father's name must be 3 to 30 characters")
//         .isAlpha('en-US', { ignore: ' -' }).withMessage("Father's name must only contain alphabets"),

//     check('father_name_bangla')
//         .trim()
//         .notEmpty().withMessage("Father's Bangla name is required")
//         .isLength({ min: 3, max: 30 }).withMessage("Father's Bangla name must be 3 to 30 characters")
//         .isAlpha('bn-BD', { ignore: ' -' }).withMessage("Father's Bangla name must only contain Bengali alphabets"),

//     check('mother_name')
//         .trim()
//         .notEmpty().withMessage("Mother's name is required")
//         .isLength({ min: 3, max: 30 }).withMessage("Mother's name must be 3 to 30 characters")
//         .isAlpha('en-US', { ignore: ' -' }).withMessage("Mother's name must only contain alphabets"),

//     check('mother_name_bangla')
//         .trim()
//         .notEmpty().withMessage("Mother's Bangla name is required")
//         .isLength({ min: 3, max: 30 }).withMessage("Mother's Bangla name must be 3 to 30 characters")
//         .isAlpha('bn-BD', { ignore: ' -' }).withMessage("Mother's Bangla name must only contain Bengali alphabets"),

//     check('guardian_name')
//         .trim()
//         .notEmpty().withMessage("Guardian's name is required")
//         .isLength({ min: 3, max: 30 }).withMessage("Guardian's name must be 3 to 30 characters")
//         .isAlpha('en-US', { ignore: ' -' }).withMessage("Guardian's name must only contain alphabets"),

//     check('guardian_name_bangla')
//         .trim()
//         .notEmpty().withMessage("Guardian's Bangla name is required")
//         .isLength({ min: 3, max: 30 }).withMessage("Guardian's Bangla name must be 3 to 30 characters")
//         .isAlpha('bn-BD', { ignore: ' -' }).withMessage("Guardian's Bangla name must only contain Bengali alphabets"),

//     check('guardian_phone')
//         .notEmpty().withMessage("Guardian's phone is required")
//         .isMobilePhone("bn-BD", {
//             strictMode: true,
//         })
//         .withMessage("Guardian's phone must be a valid Bangladeshi mobile number"),

//     check('guardian_email')
//         .optional()
//         .isEmail().withMessage("Invalid email format"),
//     check('date_of_birth')
//         .notEmpty().withMessage('Date of birth is required')
//         .isDate().withMessage('Invalid date format for date of birth'),


//     check('religion')

//         .trim()
//         .notEmpty().withMessage('Religion is required')
//         .isIn(religion)
//         .withMessage('Invalid religion'),
//     check('phone')
//         .notEmpty().withMessage('Phone is required')
//         .isMobilePhone("bn-BD", {
//             strictMode: true,
//         }).withMessage('Phone must be a valid Bangladeshi mobile number'),
//     check('email')
//         .optional()
//         .isEmail().withMessage("Invalid email format"),

//     check('address')
//         .notEmpty().withMessage('Address is required')
//         .isLength({ min: 5, max: 200 }).withMessage('Address must be 5 to 200 characters').trim(),


//     check('gender')
//         .notEmpty().withMessage('Gender is required')
//         .isIn(gender)
//         .withMessage('Invalid gender'),

//     check('nameOfClass')
//         .trim()
//         .notEmpty().withMessage('Class name is required')
//         .isLength({ min: 2, max: 30 }).withMessage('Class name must be 2 to 30 characters')
//         .isIn(nameOfClass).withMessage('Invalid class name'),

//     check('sakha')
//         .trim()
//         .notEmpty().withMessage('Sakha is required')
//         .isIn(sakha).withMessage('Invalid sakha'),

//     check('date_of_admission')
//         .notEmpty().withMessage('Date of admission is required')
//         .isDate().withMessage('Invalid date format for date of admission'),

//     check('roll')
//         .notEmpty().withMessage('Roll is required')
//         .isInt().withMessage('Roll must be an integer')
//         .isLength({ min: 1, max: 1000 }).withMessage('Roll must be 1 to 1000 characters').custom(async (v, { req }) => {
//             try {
//                 const roll = await Student.exists({ $and: [{ nameOfClass: req.body.nameOfClass }, { academic_year: req.body.academic_year }, { roll: v }] });
//                 if (roll) {
//                     throw createError(400, 'this roll number is already exist');
//                 }
//             } catch (err) {
//                 throw createError(err.message);
//             }
//         }),

//     check('blood_group')
//         .notEmpty().withMessage('Blood group is required')
//         .isIn(blood_group)
//         .withMessage('Invalid blood group'),

//     check('group')
//         .trim()
//         .notEmpty().withMessage('Class category is required')
//         .isIn(group).withMessage('Invalid class category'),

//     check('academic_year')
//         .trim()
//         .notEmpty().isInt().isLength({ min: 4, max: 4 }).withMessage('Academic year is required'),



// ];
// const updateStudentValidation = [

//     check('guardian_name')
//         .optional()
//         .trim()
//         .notEmpty().withMessage("Guardian's name is required")
//         .isLength({ min: 3, max: 30 }).withMessage("Guardian's name must be 3 to 30 characters")
//         .isAlpha('en-US', { ignore: ' -' }).withMessage("Guardian's name must only contain alphabets"),

//     check('guardian_name_bangla')
//         .optional()
//         .trim()
//         .notEmpty().withMessage("Guardian's Bangla name is required")
//         .isLength({ min: 3, max: 30 }).withMessage("Guardian's Bangla name must be 3 to 30 characters")
//         .isAlpha('bn-BD', { ignore: ' -' }).withMessage("Guardian's Bangla name must only contain Bengali alphabets"),

//     check('guardian_phone')
//         .optional()
//         .notEmpty().withMessage("Guardian's phone is required")
//         .isMobilePhone("bn-BD", {
//             strictMode: true,
//         })
//         .withMessage("Guardian's phone must be a valid Bangladeshi mobile number"),

//     check('guardian_email')
//         .optional()
//         .isEmail().withMessage("Invalid email format"),
//     check('phone')
//         .optional()
//         .notEmpty().withMessage('Phone is required')
//         .isMobilePhone("bn-BD", {
//             strictMode: true,
//         }).withMessage('Phone must be a valid Bangladeshi mobile number'),


//     check('address')
//         .optional()
//         .trim()
//         .notEmpty().withMessage('Address is required')
//         .isLength({ min: 5, max: 200 }).withMessage('Address must be 5 to 200 characters'),

//     check('nameOfClass')
//         .optional()
//         .trim()
//         .notEmpty().withMessage('Class name is required')
//         .isLength({ min: 2, max: 30 }).withMessage('Class name must be 2 to 30 characters')
//         .isIn(nameOfClass).withMessage('Invalid class name'),

//     check('sakha')
//         .optional()
//         .trim()
//         .notEmpty().withMessage('Sakha is required')
//         .isIn(sakha).withMessage('Invalid sakha'),


//     check('roll')
//         .optional()
//         .notEmpty().withMessage('Roll is required')
//         .isInt().withMessage('Roll must be an integer')
//         .isLength({ min: 1, max: 1000 }).withMessage('Roll must be 1 to 1000 characters'),


//     check('group')
//         .optional()
//         .trim()
//         .notEmpty().withMessage('Class category is required')
//         .isIn(group).withMessage('Invalid class category'),

//     check('academic_year')
//         .optional()
//         .trim()
//         .notEmpty().withMessage('Academic year is required'),
// ]
// module.exports = { addStudentValidation, updateStudentValidation };



//




const { check, validationResult } = require('express-validator');
const { nameOfClass, sakha, blood_group, gender, group, religion } = require("../models/data.json");
const Student = require('../models/student');
const createError = require('http-errors');

const addStudentValidation = [
    check("student_id").isLength({ min: 10, max: 10 }).withMessage('id must be 10 character').custom(async (value) => {
        try {
            const id = await Student.exists({ student_id: value });
            if (id) {
                throw createError("student id already is exist!");
            }
        } catch (err) {
            throw createError(err.message);
        }
    }),
    check('birth_no').isLength({ min: 17, max: 17 }).withMessage('birth certificate number must be 17 character').custom(async (value) => {
        try {
            const number = await Student.exists({ birth_no: value });
            if (number) {
                throw createError("birth certificate number already exist!");
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
    check('email')
        .optional()
        .isEmail().withMessage("Invalid email format"),


    check('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(gender)
        .withMessage('Invalid gender'),

    check('nameOfClass')
        .trim()
        .notEmpty().withMessage('Class name is required')
        .isLength({ min: 2, max: 30 }).withMessage('Class name must be 2 to 30 characters')
        .isIn(nameOfClass).withMessage('Invalid class name'),

    check('sakha')
        .trim()
        .notEmpty().withMessage('Sakha is required')
        .isIn(sakha).withMessage('Invalid sakha'),

    check('date_of_admission')
        .notEmpty().withMessage('Date of admission is required')
        .isDate().withMessage('Invalid date format for date of admission'),

    check('roll')
        .notEmpty().withMessage('Roll is required')
        .isInt().withMessage('Roll must be an integer')
        .isLength({ min: 1, max: 1000 }).withMessage('Roll must be 1 to 1000 characters').custom(async (v, { req }) => {
            try {
                const roll = await Student.exists({ $and: [{ nameOfClass: req.body.nameOfClass }, { academic_year: req.body.academic_year }, { roll: v }] });
                if (roll) {
                    throw createError(400, 'this roll number is already exist');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),

    check('blood_group')
        .notEmpty().withMessage('Blood group is required')
        .isIn(blood_group)
        .withMessage('Invalid blood group'),

    check('group')
        .trim()
        .notEmpty().withMessage('Class category is required')
        .isIn(group).withMessage('Invalid class category'),

    check('academic_year')
        .trim()
        .notEmpty().isInt().isLength({ min: 4, max: 4 }).withMessage('Academic year is required'),

    //father information here;

    check('father.name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 30 }).withMessage('Name must be 3 to 30 characters')
        .isAlpha('en-US', { ignore: ' -' }).withMessage('Name must only contain alphabets'),

    check('father.name_bangla')
        .trim()
        .notEmpty().withMessage('Bangla name is required')
        .isLength({ min: 3, max: 30 }).withMessage('Bangla name must be 3 to 30 characters')
        .isAlpha('bn-BD', { ignore: ' -' }).withMessage('Bangla name must only contain Bengali alphabets'),
    check('father.date_of_birth')
        .notEmpty().withMessage('Date of birth is required')
        .isDate().withMessage('Invalid date format for date of birth'),

    check('father.birth_no').optional().isLength({ min: 17, max: 17 }).withMessage('birth certificate number must be 17 character'),
    check('father.nid_no').optional().isLength({ min: 5, max: 17 }),
    check('father.phone').optional()
        .notEmpty().withMessage('Phone is required')
        .isMobilePhone("bn-BD", {
            strictMode: true,
        }).withMessage('Phone must be a valid Bangladeshi mobile number'),
    check('father.email')
        .optional()
        .isEmail().withMessage("Invalid email format"),



    //mother information here;
    check('mother.name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 30 }).withMessage('Name must be 3 to 30 characters')
        .isAlpha('en-US', { ignore: ' -' }).withMessage('Name must only contain alphabets'),

    check('mother.name_bangla')
        .trim()
        .notEmpty().withMessage('Bangla name is required')
        .isLength({ min: 3, max: 30 }).withMessage('Bangla name must be 3 to 30 characters')
        .isAlpha('bn-BD', { ignore: ' -' }).withMessage('Bangla name must only contain Bengali alphabets'),
    check('mother.date_of_birth')
        .notEmpty().withMessage('Date of birth is required')
        .isDate().withMessage('Invalid date format for date of birth'),

    check('mother.birth_no').optional().isLength({ min: 17, max: 17 }).withMessage('birth certificate number must be 17 character'),
    check('mother.nid_no').optional().isLength({ min: 5, max: 17 }),
    check('mother.phone').optional()
        .notEmpty().withMessage('Phone is required')
        .isMobilePhone("bn-BD", {
            strictMode: true,
        }).withMessage('Phone must be a valid Bangladeshi mobile number'),
    check('mother.email')
        .optional()
        .isEmail().withMessage("Invalid email format"),

    //guardian information here;
    check('guardian.relation')
        .trim()
        .notEmpty().withMessage('relation is required')
        .isLength({ min: 3, max: 30 }).withMessage('Name must be 3 to 30 characters')
        .isAlpha('bn-BD', { ignore: ' -' }).withMessage('relation must only contain alphabets'),
    check('guardian.name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 30 }).withMessage('Name must be 3 to 30 characters')
        .isAlpha('en-US', { ignore: ' -' }).withMessage('Name must only contain alphabets'),

    check('guardian.name_bangla')
        .trim()
        .notEmpty().withMessage('Bangla name is required')
        .isLength({ min: 3, max: 30 }).withMessage('Bangla name must be 3 to 30 characters')
        .isAlpha('bn-BD', { ignore: ' -' }).withMessage('Bangla name must only contain Bengali alphabets'),
    check('guardian.date_of_birth')
        .notEmpty().withMessage('Date of birth is required')
        .isDate().withMessage('Invalid date format for date of birth'),

    check('guardian.birth_no').optional().isLength({ min: 17, max: 17 }).withMessage('birth certificate number must be 17 character'),
    check('guardian.nid_no').optional().isLength({ min: 5, max: 17 }),
    check('guardian.phone')
        .notEmpty().withMessage('Phone is required')
        .isMobilePhone("bn-BD", {
            strictMode: true,
        }).withMessage('Phone must be a valid Bangladeshi mobile number'),
    check('guardian.email')
        .isEmail().withMessage("Invalid email format"),

    //address here

    check("address").trim()
        .notEmpty().withMessage('address is required')
        .isLength({ min: 3, max: 100 }).withMessage('address must be 3 to 100 characters')
        .isAlpha('en-US', { ignore: ' -,' }).withMessage('adderss must only contain alphabets'),
    check("address_bn")
        .notEmpty().withMessage('address is required')
        .isLength({ min: 3, max: 100 }).withMessage('address must be 3 to 100 characters')
        .isAlpha('bn-BD', { ignore: ' -,' }).withMessage('adderss must only contain Bengali alphabets'),

];
const updateStudentValidation = [

    check('guardian_name')
        .optional()
        .trim()
        .notEmpty().withMessage("Guardian's name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Guardian's name must be 3 to 30 characters")
        .isAlpha('en-US', { ignore: ' -' }).withMessage("Guardian's name must only contain alphabets"),

    check('guardian_name_bangla')
        .optional()
        .trim()
        .notEmpty().withMessage("Guardian's Bangla name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Guardian's Bangla name must be 3 to 30 characters")
        .isAlpha('bn-BD', { ignore: ' -' }).withMessage("Guardian's Bangla name must only contain Bengali alphabets"),

    check('guardian_phone')
        .optional()
        .notEmpty().withMessage("Guardian's phone is required")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Guardian's phone must be a valid Bangladeshi mobile number"),

    check('guardian_email')
        .optional()
        .isEmail().withMessage("Invalid email format"),
    check('phone')
        .optional()
        .notEmpty().withMessage('Phone is required')
        .isMobilePhone("bn-BD", {
            strictMode: true,
        }).withMessage('Phone must be a valid Bangladeshi mobile number'),


    check('address')
        .optional()
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 5, max: 200 }).withMessage('Address must be 5 to 200 characters'),

    check('nameOfClass')
        .optional()
        .trim()
        .notEmpty().withMessage('Class name is required')
        .isLength({ min: 2, max: 30 }).withMessage('Class name must be 2 to 30 characters')
        .isIn(nameOfClass).withMessage('Invalid class name'),

    check('sakha')
        .optional()
        .trim()
        .notEmpty().withMessage('Sakha is required')
        .isIn(sakha).withMessage('Invalid sakha'),


    check('roll')
        .optional()
        .notEmpty().withMessage('Roll is required')
        .isInt().withMessage('Roll must be an integer')
        .isLength({ min: 1, max: 1000 }).withMessage('Roll must be 1 to 1000 characters'),


    check('group')
        .optional()
        .trim()
        .notEmpty().withMessage('Class category is required')
        .isIn(group).withMessage('Invalid class category'),

    check('academic_year')
        .optional()
        .trim()
        .notEmpty().withMessage('Academic year is required'),
]
module.exports = { addStudentValidation, updateStudentValidation };

const createError = require("http-errors");
const { check } = require('express-validator')
const { nameOfClass, day, priority, sakha } = require('../models/data.json')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const addRotineValidation = [
    check("subject")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isLength({ min: 3, max: 30 })
        .withMessage("name must should 3 to 30 character")
        .trim(),

    check("teacher")
        .isLength({ min: 1 })
        .withMessage("teacher name is required")
        .isLength({ min: 3, max: 30 })
        .withMessage("name must should 3 to 30 character")
        .trim(),
    check("teacher_id").isLength({ min: 8, max: 8 }).withMessage('id must be 8 character'),

    check("day")
        .notEmpty()
        .withMessage("day name is required").isIn(day)
    ,

    check("from")
        .isTime().withMessage('not a valid time')
    ,
    check("to")
        .isTime().withMessage('not a valid time')
    ,
    check('priority')
        .notEmpty().isIn([1, 2, 3, 4, 5, 6, 7]).withMessage('not a valid priority'),
    check('sakha')
        .notEmpty().isIn(sakha).withMessage('not a valid sakha'),
    check("nameOfClass")
        .notEmpty()
        .withMessage("name of class is required")
        .isAlpha("bn-BD", { ignore: " -," })
        .withMessage("name of class must not contain anything other than alphabet")
        .isIn(nameOfClass)
        .withMessage('not a valid class name')
        .trim(),
];




module.exports = { addRotineValidation }
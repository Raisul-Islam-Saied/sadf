const createError = require("http-errors");
const { body } = require('express-validator')
const { nameOfClass, day, priority, sakha } = require('../models/data.json')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const addRotineValidation = [
    body("subject")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isLength({ min: 3, max: 30 })
        .withMessage("name must should 3 to 30 character")
        .trim(),

    body("teacher")
        .isLength({ min: 1 })
        .withMessage("teacher name is required")
        .isLength({ min: 3, max: 30 })
        .withMessage("name must should 3 to 30 character")
        .trim(),
    body("teacher_id").isLength({ min: 8, max: 8 }).withMessage('id must be 8 character'),

    body("day")
        .notEmpty()
        .withMessage("day name is required").isIn(day)
    ,

    body("from")
        .isTime().withMessage('not a valid time')
    ,
    body("to")
        .isTime().withMessage('not a valid time')
    ,

    body('sakha')
        .notEmpty().isIn(sakha).withMessage('not a valid sakha'),
    body("nameOfClass")
        .notEmpty()
        .withMessage("name of class is required")
        .isAlpha("bn-BD", { ignore: " -," })
        .withMessage("name of class must not contain anything other than alphabet")
        .isIn(nameOfClass)
        .withMessage('not a valid class name')
        .trim(),
];




module.exports = { addRotineValidation }
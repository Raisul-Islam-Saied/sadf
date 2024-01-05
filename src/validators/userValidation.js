const createError = require("http-errors");
const { check } = require('express-validator')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const addUserValidators = [
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isLength({ min: 3, max: 30 })
        .withMessage("name must should 3 to 30 character")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),

    check("email")
        .isEmail()

        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.exists({ email: value });
                if (user) {
                    throw createError("Email already is use!");
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check("phone")
        .notEmpty()
        .withMessage("mobile number is required")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be a valid Bangladeshi mobile number")
        .custom(async (value) => {
            try {
                const user = await User.exists({ mobile: value });
                if (user) {
                    throw createError("Mobile already is use!");
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check("password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        ),
    check("confirm_password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        )
        .custom((v, { req }) => {
            if (v === req.body.password) {
                return true
            } else {
                throw createError(400, 'password did not mached')
            }
        })
    ,

    check("address")
        .notEmpty()
        .withMessage("address is required")

        .isAlpha("en-US", { ignore: " -," })
        .withMessage("address must not contain anything other than alphabet")
        .trim(),

    check('gender').notEmpty().withMessage('please select your gender , its required').isIn(['male', 'female']),
    check('avatar').optional()


];

const updataUserValidators = [
    check("name")
        .optional()
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isLength({ min: 3, max: 30 })
        .withMessage("name must should 3 to 30 character")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),

    check("address")
        .optional()
        .notEmpty()
        .withMessage("address is required")

        .isAlpha("en-US", { ignore: " -" })
        .withMessage("address must not contain anything other than alphabet")
        .trim(),

    check('avatar').optional()


]

const updatePasswordValidators = [
    check("id")
        .notEmpty()
        .isLength(24),
    check("old_password")
        .notEmpty()
        .withMessage('please enter your old password')
        .custom(async (value, { req }) => {
            try {
                const user = await User.findById(req.body.id);
                if (!bcrypt.compareSync(value, user.password)) {
                    throw createError("old password not mached!");
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),


    check("password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        ),
    check("confirm_password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        )
        .custom((v, { req }) => {
            if (v === req.body.password) {
                return true
            } else {
                throw createError(400, 'password did not mached')
            }
        })
    ,


];

const resetPasswordRequestValidation = [

    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.exists({ email: value });
                if (!user) {
                    throw createError("no user found with this email");
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),


];

const resetPasswordValidators = [
    check('token')
        .notEmpty()
        .isJWT()
        .withMessage('not a valid token'),
    check("new_password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        ),
    check("confirm_password")

        .custom((v, { req }) => {
            if (v === req.body.new_password) {
                return true
            } else {
                throw createError(400, 'password did not mached')
            }
        })
    ,


];

module.exports = { addUserValidators, updataUserValidators, updatePasswordValidators, resetPasswordRequestValidation, resetPasswordValidators }
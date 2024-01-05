const { check } = require("express-validator");

const User = require("../models/users");
const createError = require("http-errors");

const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("name must should 3 to 30 character")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("slug")
    .isLength({ min: 1 })
    .withMessage("slug name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("slug name must should 3 to 30 character")
    .isAlpha("en-US")
    .withMessage("Slug Name must not contain anything other than alphabet")
    .toLowerCase()
    .trim(),
];

module.exports = {
  addUserValidators,
  loginValidator,
  updatePasswrodValidation,
  forgotPasswordValidation,
  resetPasswordValidatoin,
};

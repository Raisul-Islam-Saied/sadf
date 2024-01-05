const { check } = require("express-validator");


const createError = require("http-errors");

// const addUserValidators = [
//   check("name")
//     .isLength({ min: 1 })
//     .withMessage("Name is required")
//     .isLength({ min: 3, max: 30 })
//     .withMessage("name must should 3 to 30 character")
//     .isAlpha("en-US", { ignore: " -" })
//     .withMessage("Name must not contain anything other than alphabet")
//     .trim(),

//   check("email")
//     .isEmail()

//     .withMessage("Invalid email address")
//     .trim()
//     .custom(async (value) => {
//       try {
//         const user = await User.exists({ email: value });
//         if (user) {
//           throw createError("Email already is use!");
//         }
//       } catch (err) {
//         throw createError(err.message);
//       }
//     }),
//   check("phone")
//     .notEmpty()
//     .withMessage("mobile number is required")
//     .isMobilePhone("bn-BD", {
//       strictMode: true,
//     })
//     .withMessage("Mobile number must be a valid Bangladeshi mobile number")
//     .custom(async (value) => {
//       try {
//         const user = await User.exists({ mobile: value });
//         if (user) {
//           throw createError("Mobile already is use!");
//         }
//       } catch (err) {
//         throw createError(err.message);
//       }
//     }),
//   check("password")
//     .isStrongPassword()
//     .withMessage(
//       "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
//     ),

//   check("address")
//     .notEmpty()
//     .withMessage("address is required")

//     .isAlpha("en-US", { ignore: " -" })
//     .withMessage("address must not contain anything other than alphabet")
//     .trim(),
// ];
const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim(),
  check("password").notEmpty().withMessage("password is required"),
];

const updatePasswrodValidation = [
  check("old_password").notEmpty().withMessage("password is required"),
  check("new_password")
    .notEmpty()
    .withMessage("new password and comfirm password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
  check("confirm_password").custom((v, { req }) => {
    if (v === req.body.new_password) {
      return true;
    } else {
      throw createError(400, "password did not matched");
    }
  }),
];

const resetPasswordValidatoin = [
  check("token").notEmpty().withMessage("token not found"),
  updatePasswrodValidation[1],
  updatePasswrodValidation[2],
];

const forgotPasswordValidation = [loginValidator[0]];

module.exports = {
  
  loginValidator,
  updatePasswrodValidation,
  forgotPasswordValidation,
  resetPasswordValidatoin,
};

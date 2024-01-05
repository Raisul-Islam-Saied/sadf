const { check } = require("express-validator");

const sendOtpByPhone = [
    check("phone")
        .notEmpty()
        .withMessage("mobile number is required")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be a valid Bangladeshi mobile number")
]

module.exports = { sendOtpByPhone }
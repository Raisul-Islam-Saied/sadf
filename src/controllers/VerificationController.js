const createError = require("http-errors");
const otpTemplate = require("../helper/mailgenOtp");
const mailWithNodemailer = require("../helper/email");
const People = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { successMessage } = require("../helper/successMessage");

const Otp = require("../models/otp");
const { jwt_otp_key, email_unverified_code, client_url, app_name } = require("../config/config");

const jwtToken = require("../helper/jwt");
const { sendSMS } = require("../helper/sms");

const sendOtpWithEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      throw createError(404, "email not found");
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const emaildata = {
      email: email,
      subject: "email verification request",
      html: otpTemplate('', otp, '', 'your verification code is : '),
    };
    await mailWithNodemailer(emaildata);
    const otpToken = jwtToken({ otp: otp }, jwt_otp_key, '5m')

    await Otp.create({ method: email, otp: otpToken });
    successMessage(res, 200, "verification email send successfully", { email });
  } catch (error) {
    next({
      common: {
        msg: error.message,
      },
    });
  }
};


const sendOtpWithSms = async (req, res, next) => {
  try {
    const phone = req.body.phone;
    if (!phone) {
      throw createError(404, "phone number not found");
    }
    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendSMS(`your ${app_name} otp is : ${otp}`, phone);
    console.log(otp);
    const otpToken = jwtToken({ otp: otp }, jwt_otp_key, '5m')
    await Otp.create({ method: phone, otp: otpToken });
    successMessage(res, 200, "verification message send successfully", {
      phone,
    });
  } catch (error) {
    next({
      common: {
        msg: error.message,
      },
    });
  }
};
const vefrifyOtp = async (req, res, next) => {
  try {
    const { otp, method } = req.body;
    if (!otp || !method) {
      throw createError(404, "something is missing");
    }

    const dbotp = await Otp.findOne({ method: method }).sort({
      createdAt: -1,
    });
    if (!dbotp) {
      throw createError(404, "not found");
    }
    const jwtOtp = jwt.verify(dbotp.otp, jwt_otp_key)

    if (jwtOtp.otp === Number(otp)) {
      await dbotp.updateOne({ verified: true })
      successMessage(res, 200, "verification successfull");
    } else {
      throw createError(400, "you entered Wrong Otp");
    }

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next({
        otp: {
          msg: 'otp is expaired',
        },
      });
    }

    else {
      next({
        otp: {
          msg: error.message,
        },
      });

    }

  }
};

const emailVerifyRequest = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      throw createError(404, 'please enter email')
    }

    const user = await People.findOne({ email: email + email_unverified_code })


    if (user) {
      const token = jwtToken({ id: user._id, email: user.email }, jwt_otp_key, "5m")
      const emaildata = {
        email: email,
        subject: "email verification request",
        html: otpTemplate(user.name, 'verify', `${client_url}/user/verify_email/${token}`, 'to verify your email click to the button'),
      };
      await mailWithNodemailer(emaildata)
      successMessage(res, 200, 'your email varification link sent to your email ')

    } else {
      throw createError(404, 'no unverified email found with this email')
    }

  } catch (error) {
    next({
      common: {
        msg: error
      }
    })

  }
}

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, jwt_otp_key)
    if (decoded) {
      const updatedEmail = decoded.email.split(email_unverified_code)[0]
      const user = await People.findOneAndUpdate({
        _id: decoded.id
      }, { email: updatedEmail }, { new: true, runValidators: true });

      if (user) {
        successMessage(res, 200, "successfully verified your email ");
      } else {
        throw createError(400, "no unverified email found with this email");
      }
    } else {
      throw createError(400, 'invalid token, please verify again')
    }

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next({
        common: {
          msg: 'expired , please verify again'
        }
      })
    }
    next({
      common: {
        msg: error.message,
      },
    });
  }
};


module.exports = {
  sendOtpWithEmail,
  vefrifyOtp,
  verifyEmail,
  sendOtpWithSms,
  emailVerifyRequest
};

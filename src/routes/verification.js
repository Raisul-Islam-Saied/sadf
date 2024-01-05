const express = require("express");
const seedUser = require("../controllers/seedController");
const {
  sendOtpWithEmail,
  vefrifyEmailOtp,
  verifyEmail,
  sendOtpWithSms,
  vefrifyOtp,
  emailVerifyRequest,
} = require("../controllers/VerificationController");
const { sendOtpByPhone } = require("../validators/verification");

const verificationRouter = express.Router();

verificationRouter.post("/send_otp_by_email", sendOtpWithEmail);
verificationRouter.post("/verify_otp", vefrifyOtp);
verificationRouter.post("/email_verify_request", emailVerifyRequest);
verificationRouter.put("/verify_email", verifyEmail);

verificationRouter.post("/send_otp_by_phone", sendOtpByPhone, sendOtpWithSms);

module.exports = verificationRouter;

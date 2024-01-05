const createError = require("http-errors");

const mailWithNodemailer = require("./email");

const sendEmail = async (emailData) => {
  try {
    await mailWithNodemailer(emailData);
  } catch (error) {
    throw createError(400, "failed to send email");
  }
};
module.exports = sendEmail;

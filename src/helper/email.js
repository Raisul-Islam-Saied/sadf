const nodemailer = require("nodemailer");
const { smtp_username, smtp_password } = require("../config/config");
const createHttpError = require("http-errors");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: smtp_username,
    pass: smtp_password,
  },
});

const mailWithNodemailer = async (mailData) => {
  try {
    const { email, subject, html } = mailData;
    const mailOptions = {
      from: smtp_username,
      to: email,
      subject: subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("info", `mail send :  ${info.response}`);
  } catch (error) {
    console.log("error", `error occured while sending email :  ${error}`);
    throw createHttpError(400, "failed to send email");
  }
};
// async..await is not allowed in global scope, m
module.exports = mailWithNodemailer;

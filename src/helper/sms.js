const createError = require("http-errors");
const {
  twilio_accountSid,
  twilio_authToken,
  twilio_phone_number,
} = require("../config/config");

const client = require("twilio")(twilio_accountSid, twilio_authToken);

const sendSMS = async (body, phone_number) => {
  try {
    const message = await client.messages.create({
      body: body,
      to: phone_number,
      from: twilio_phone_number,
    });
    console.log("send successfully sms is : ", message);
  } catch (error) {
    // You can implement your fallback code here
    console.error(error);
    throw createError(400, "faild to send sms");

  }
};
module.exports = { sendSMS };

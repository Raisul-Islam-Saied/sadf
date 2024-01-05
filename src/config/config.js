require("dotenv").config();
module.exports = {
  port: process.env.PORT || 3004,
  database_url: process.env.DATABASE_URL,
  app_name: process.env.APP_NAME,
  jwtSectetKey: process.env.JWT_SECRET_KEY,
  smtp_username: process.env.SMTP_USER_NAME,
  smtp_password: process.env.SMTP_PASSWORD,
  client_url: process.env.CLIENT_URL,
  jwt_access_key: process.env.JWT_ACCESS_KEY,
  jwt_refresh_key: process.env.JWT_REFRESH_KEY,
  twilio_accountSid: process.env.TWILIO_ACCOUNT_SID,
  twilio_authToken: process.env.TWILIO_ACCOUNT_AUTH_TOKEN,
  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
  jwt_otp_key: process.env.JWT_OTP_SECRET,
  email_unverified_code: process.env.EMAIL_UNVERIFIED_CODE,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
};

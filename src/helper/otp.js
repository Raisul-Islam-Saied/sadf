const speakeasy = require("speakeasy");
const secret = speakeasy.generateSecret({ length: 20 });

const genarateOTP = () => {
  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    window: 1,
    step: 300,
  });
  return token;
};

const verifyOTP = (otp) => {
  const tokenValidates = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: "base32",
    token: otp,
    window: 1,
    step: 300,
  });
  return tokenValidates;
};

module.exports = { genarateOTP, verifyOTP };

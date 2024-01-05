const successMessage = (res, statusCode, message, payload = {}) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    payload,
  });
};
module.exports = { successMessage };

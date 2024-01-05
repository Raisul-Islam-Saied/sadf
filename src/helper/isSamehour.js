const isTimeStampValid = (yourTime, validateTime) => {
  // Assuming OTP creation time
  const currentTime = new Date();
  const createdAtMillis = new Date(yourTime).getTime();
  const timeDifference = (currentTime - createdAtMillis) / 1000;

  return timeDifference <= validateTime * 60;
};

module.exports = isTimeStampValid;

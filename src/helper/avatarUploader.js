const uploader = require("./uploader");

const avatarUploader = (req, res, next) => {
  const upload = uploader(
    ["image/jpg", "image/jpeg", "image/png"],
    1024 * 1024 * 2,
    "only jpg or jpeg or png file allowed"
  );
  return upload.any()(req, res, (err) => {
    if (err) {
      next({
        avatar: {
          msg: err.message,
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUploader;

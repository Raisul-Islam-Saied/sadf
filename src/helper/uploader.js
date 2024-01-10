const createError = require("http-errors");
const multer = require("multer");
const path = require('path')
const uploader = (allowed_file_type, max_file_size, error_message, local = false, file_sub_path) => {
  if (local) {


    const uploads_folder = path.join(
      __dirname,
      "/../",
      "/../public/uploads",
      file_sub_path
    );

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploads_folder);
      },
      filename: (req, file, cb) => {
        const extensionName = path.extname(file.originalname);


        const fileName =
          file.originalname
            .replace(extensionName, "")
            .toLowerCase()
            .split(" ")
            .join("_") +
          "_" +
          Date.now();
        cb(null, fileName + extensionName);
      },
    });
    const upload = multer({
      storage: storage,
      limits: {
        fileSize: max_file_size,

      },
      fileFilter: (req, file, cb) => {
        if (allowed_file_type.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(createError(error_message));
        }
      },
    });
    return upload
  } else {
    const storage = multer.memoryStorage();
    const upload = multer({
      storage: storage,
      limits: {
        fileSize: max_file_size,

      },
      fileFilter: (req, file, cb) => {
        if (allowed_file_type.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(createError(error_message));
        }
      },
    });
    return upload;
  }
};

module.exports = uploader;

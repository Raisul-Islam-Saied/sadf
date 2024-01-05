const uploader = require("./uploader");

const pdfUploader = (req, res, next) => {
    const upload = uploader(
        ["application/pdf"],
        1024 * 1024 * 1,
        "only pdf file allowed",
        true,
        "syllabus"
    );
    return upload.any()(req, res, (err) => {

        if (err) {
            next({
                file: {
                    msg: err.message,
                },
            });
        } else {
            next();
        }
    });
};

module.exports = pdfUploader;

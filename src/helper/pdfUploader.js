const uploader = require("./uploader");

const pdfUploader = (req, res, next) => {
    const upload = uploader(
        ["application/pdf"],
        1024 * 1024 * 10,
        "only pdf file allowed",

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

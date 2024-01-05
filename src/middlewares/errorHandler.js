const createError = require("http-errors");
const { MongooseError } = require("mongoose");

const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your requested content was not found"));
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: err,
  });
 
};

module.exports = { notFoundHandler, errorHandler };

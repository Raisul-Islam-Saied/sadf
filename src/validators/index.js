const { validationResult } = require("express-validator");


const runValidators = async (req, res, next) => {
  const errors = validationResult(req);
  
  const mappedErrors = errors.mapped();
  if (errors.isEmpty()) {
    next();
  } else {
    next(mappedErrors);

  }
};
module.exports = runValidators;

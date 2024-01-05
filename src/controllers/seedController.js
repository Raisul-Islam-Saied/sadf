const createError = require("http-errors");
const { user, users } = require("../models/userData");
const User = require("../models/userModel");
const { successMessage } = require("../helper/successMessage");

const seedUser = async (req, res, next) => {
  try {
    await User.deleteMany({});
    const newUser = await User.insertMany(users);
    successMessage(res, 201, "successfully seeded", newUser);
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports = seedUser;

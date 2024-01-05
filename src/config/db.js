const mongoose = require("mongoose");
const { database_url } = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(database_url);
    console.log("database connection successfully");
  } catch (error) {
    console.error("failed to connect to database");
    console.error(`DataBase Error : ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;

const { hashSync, genSaltSync } = require("bcryptjs");
const { Schema, model } = require("mongoose");
const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required field"],
      minlength: ["3", "name must be at least 3 cherecters long"],
      maxLength: ["30", "name can be maximum 30 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "this email already exist "],
      // validate: {
      //   validator: (v) => {
      //     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      //   },
      // },
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: [true, "this mobile number is already exist "],
    },
    password: {
      type: String,
      required: true,
      minlength: ["6", "password must be at lest 6 cherecter long"],
      set: (v) => {
        return hashSync(v, genSaltSync(10));
      },
    },
    address: {
      type: String,
      required: true,
      min: ["3", "address must be minimum 3 character long"],
      max: ["100", "maximum character is 100"],
    },
    gender: {
      required: [true, 'gender is reqired'],
      type: String,
      enum: ['male', 'female']
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student', 'user'],
      default: "user"

    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const People = model("People", schema);

module.exports = People;

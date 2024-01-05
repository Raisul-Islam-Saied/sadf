const { Schema, model } = require("mongoose");
const schema = new Schema({
  method: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
schema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 15 }); // Expire documents after 1 hour (3600 seconds)
const Otp = model("Otp", schema);

module.exports = Otp;

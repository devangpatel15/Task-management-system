const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    countryCode: { type: String, required: true },
    mobileNo: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["Female", "Male", "Other"] },
    dob: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

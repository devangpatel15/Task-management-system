const mongoose = require("mongoose");

require("dotenv").config();

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGODB);
    console.log("Database Connected");
  } catch (error) {
    console.error("error", error);
  }
};

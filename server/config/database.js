const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log("error", err);
      process.exit(1);
    });
};

const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
      unique: false,
    },
    message: {
      type: String,
      unique: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);

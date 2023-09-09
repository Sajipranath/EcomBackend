const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    division: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Employe = mongoose.model("employee", userSchema);
module.exports = Employe;

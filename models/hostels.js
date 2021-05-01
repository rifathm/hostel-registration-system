const mongoose = require("mongoose");

const hostelSchema = mongoose.Schema(
  {
    contactNo: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    warden: {
      type: String,
      required: true,
    },

    subWarden: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
    default: Date.now,
  }
);

module.exports = mongoose.model("hostel", hostelSchema);

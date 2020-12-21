const mongoose = require("mongoose");

const hostelSchema = mongoose.Schema(
  {
    hostelId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      type: String,
      required: true,
    },

    wardenName: {
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

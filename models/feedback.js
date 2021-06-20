const mongoose = require("mongoose");

const feedBackSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
      unique: true,
    },
    telnum: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    contactType: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
    },

    isReplied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
    default: Date.now,
  }
);

module.exports = mongoose.model("feedback", feedBackSchema);

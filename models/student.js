const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    nic: {
      type: String,
      required: true,
      unique: true,
    },

    regNo: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    surName: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    sex: {
      type: String,
      required: true,
    },

    contactNo: {
      type: Number,
      required: true,
    },

    residentalAddress: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    GSdivision: {
      type: String,
      required: true,
    },

    DSdivision: {
      type: String,
      required: true,
    },

    faculty: {
      type: String,
      required: true,
    },

    img: {
      type: String,
    },

    course: {
      type: String,
      required: true,
    },

    preference: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    medicalIssues: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    relationship: {
      type: String,
      required: true,
    },

    residentalAddress2: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: Number,
      required: true,
    },

    policeStation: {
      type: String,
      required: true,
    },
    selectedHostel: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isVerifiedWarden: {
      type: Boolean,
      default: false,
    },
    isVerifiedDean: {
      type: Boolean,
      default: false,
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  {
    date: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("Student", schema);

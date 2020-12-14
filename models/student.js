const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
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

    nic: {
      type: String,
      required: true,
      unique: true,
    },

    sex: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    contactNo: {
      type: Number,
      required: true,
    },

    residentalAddress: {
      type: String,
      required: true,
    },

    residentDistrict: {
      type: String,
      required: true,
    },

    gsDivision: {
      type: String,
      required: true,
    },

    dsDivision: {
      type: String,
      required: true,
    },

    regNo: {
      type: String,
      required: true,
      unique: true,
    },

    faculty: {
      type: String,
      required: true,
    },

    courseOfStudy: {
      type: String,
      required: true,
    },

    yearOfStudy: {
      type: Number,
      required: true,
    },

    medicalIssues: {
      type: String,
      required: true,
    },

    guardianName: {
      type: String,
      required: true,
    },

    relationship: {
      type: String,
      required: true,
    },

    rResidentalAddress: {
      type: String,
      required: true,
    },

    policeStation: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
    default: Date.now,
  }
);

const Student = mongoose.model("Student", schema);
module.exports = Student;

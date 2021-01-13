const express = require("express");
const {
  studentValidator,
  studentValidationResult,
} = require("../Validators/studentValidator");

const {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} = require("../controllers/student");

const router = express.Router();

router.get("/", getStudents);
router.post("/", studentValidator, studentValidationResult, createStudent);
router.delete(":id", deleteStudent);
router.put("/:id", updateStudent);

module.exports = router;

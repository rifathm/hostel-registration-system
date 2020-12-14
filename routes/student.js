const express = require("express");

const {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} = require("../controllers/student");

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.put("/:id", updateStudent);

module.exports = router;

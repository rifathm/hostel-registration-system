const express = require("express");
const {
  studentValidator,
  studentValidationResult,
} = require("../Validators/studentValidator");

const {
  createStudent,
  deleteStudent,
  getStudents,
  getStudent,
  updateStudent,
  upload,
} = require("../controllers/student");

const router = express.Router();

router.get("/:id", getStudent);
router.get("/", getStudents);
// router.post("/", upload.single("image"), createStudent);
router.post(
  "/",
  upload.single("image"),
  studentValidator,
  studentValidationResult,
  createStudent
);
router.delete("/ :id", deleteStudent);
router.put("/:id", updateStudent);

module.exports = router;

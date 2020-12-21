const express = require("express");
const {
  hostelValidator,
  hostelValidationResult,
} = require("../Validators/hostelValidator");

const {
  createHostel,
  deleteHostel,
  getHostels,
  updateHostel,
} = require("../controllers/hostel");

const router = express.Router();

router.get("/", getHostels);
router.post("/", hostelValidator, hostelValidationResult, createHostel);
router.delete("/:id", deleteHostel);
router.put("/:id", updateHostel);

module.exports = router;

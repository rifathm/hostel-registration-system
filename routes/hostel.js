const express = require("express");
const {
  hostelValidator,
  hostelValidationResult,
} = require("../Validators/hostelValidator");

const {
  createHostel,
  deleteHostel,
  getHostels,
  getHostel,
  updateHostel,
} = require("../controllers/hostel");

const router = express.Router();

router.get("/", getHostels);
router.get("/:id", getHostel);
router.post(
  "/createHostel",
  hostelValidator,
  hostelValidationResult,
  createHostel
);
router.delete("/:id", deleteHostel);
router.put("/:id", updateHostel);

module.exports = router;

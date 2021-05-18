const express = require("express");

const {
  getInquerys,
  getInquery,
  createInquery,
  deleteInquery,
  updateInquery,
} = require("../controllers/feedback");

const router = express.Router();

router.get("/", getInquerys);
router.get("/:id", getInquery);
router.post(
  "/createFeedback",

  createInquery
);
router.delete("/:id", deleteInquery);
router.put("/:id", updateInquery);

module.exports = router;

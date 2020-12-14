const express = require("express");

const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} = require("../controllers/User");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;

const express = require("express");
const {
  userValidator,
  userValidationResult,
} = require("../Validators/uservalidators");

const {
  registerUser,
  deleteUser,
  getUsers,
  updateUser,
  userSignIn,
  verify,
  logout,
} = require("../controllers/signin");

const router = express.Router();

router.get("/", getUsers);
router.post("/signUp", userValidator, userValidationResult, registerUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.post("/signIn", userSignIn);
router.get("/verify", verify);
router.get("/logout", logout);

module.exports = router;

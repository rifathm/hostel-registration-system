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
  getUser,
} = require("../controllers/authController");

const router = express.Router();

router.get("/logout", logout);
router.post("/signUp", registerUser);
router.post("/signIn", userSignIn);
router.get("/verify", verify);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

router.put("/:id", updateUser);
router.get("/", getUsers);
router.post("/", getUsers);
//router.post("/signUp", userValidator, userValidationResult, registerUser);

module.exports = router;

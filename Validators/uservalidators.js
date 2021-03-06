const { check, validationResult } = require("express-validator");

exports.userValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;
    return res.status(422).json({ success: false, error: error });
  }
  next();
};

exports.userValidator = [
  check("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage(" first Name is required"),

  check("fullName")
    .trim()
    .not()
    .isEmpty()
    .withMessage(" full Name is required"),

  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  check("role")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Role is required")
    .withMessage("Please Select Your Role"),

  check("workPlace")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Role is required")
    .withMessage("Please Select Your Work Place"),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleat 8 characters "),
];

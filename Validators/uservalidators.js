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
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4, max: 30 })
    .withMessage("Name must be 3 to 20 characters length"),

  check("role").trim().not().isEmpty().withMessage("Role is required"),

  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleat 8 characters "),
];

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
    .withMessage(" f Name is required")
    .isLength({ min: 4, max: 30 })
    .withMessage("First Name must be 3 to 20 characters length"),

  check("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage(" l Name is required")
    .isLength({ min: 4, max: 30 })
    .withMessage("Last Name must be 3 to 20 characters length"),

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

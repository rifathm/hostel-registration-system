const { check, validationResult } = require("express-validator");

exports.hostelValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;
    return res.status(422).json({ success: false, error: error });
  }
  next();
};

exports.hostelValidator = [
  check("hostelId").trim().not().isEmpty().withMessage("Hostel ID is required"),

  check("name").trim().not().isEmpty().withMessage("Name is required"),

  check("location").trim().not().isEmpty().withMessage("Location is required"),

  check("wardenName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Warden Name is required"),
];

const { check, validationResult } = require("express-validator");

exports.studentValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;
    return res.status(422).json({ success: false, error: error });
  }
  next();
};

exports.studentValidator = [
  check("nic")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Nic is required")
    .isLength({ min: 10, max: 12 })
    .withMessage("NIC must be 10 to 12 characters length"),

  check("regNo").trim().not().isEmpty().withMessage("RegNo is required"),

  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  check("fullName").trim().not().isEmpty().withMessage("Full Name is required"),

  check("surName").trim().not().isEmpty().withMessage("SurName is required"),

  check("dob").trim().not().isEmpty().withMessage("DOB is required"),

  check("sex").trim().not().isEmpty().withMessage("Sex is required"),

  check("contactNo")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Contact No is required")
    .isLength({ min: 10 })
    .withMessage("Contact No must be atleat 10 characters length"),

  check("residentalAddress")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Address is required"),

  check("gsDivision")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Gs Division is required"),

  check("dsDivision")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Ds Division is required"),

  check("courseOfStudy")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Course is required"),

  check("yearOfStudy")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Year Of Study is required"),

  check("medicalIssues")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Medical Issue is required"),

  check("guardianName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Guardian Name is required"),

  check("rResidentalAddress")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Residental Address is required"),

  check("policeStation")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Police Station  is required"),
];

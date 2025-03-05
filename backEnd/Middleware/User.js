const { body, validationResult } = require("express-validator");

const userValidator = [
  body("userName").notEmpty().isString().withMessage("UserName is required"),

  body("userEmail")
    .notEmpty()
    .isString()
    .withMessage("Email must be in String"),

  body("password")
    .notEmpty()
    .isString()
    .withMessage("Password must be in String"),
  body("countryCode")
    .notEmpty()
    .isString()
    .withMessage("Country Code in a String"),
  body("mobileNo").notEmpty().isString().withMessage("Mobile no in a String"),
  body("gender").notEmpty().isString().withMessage("Gender must be in String"),
  body("DOB").notEmpty().isDate().withMessage("BirthDate in a Date Format"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];

const userUpdateValidator = [
  body("userName")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("UserName must be in String"),
  body("userEmail")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("Email must be in String"),
  body("password")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("Password must be in String"),
  body("countryCode")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("Country Code in a String"),
  body("mobileNo")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("Mobile no in a String"),
  body("gender")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("Gender must be in String"),
  body("DOB")
    .optional()
    .notEmpty()
    .isDate()
    .withMessage("BirthDate in a Date Format"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];

module.exports = { userValidator, userUpdateValidator };

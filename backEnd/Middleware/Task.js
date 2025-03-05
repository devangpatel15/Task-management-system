const { body, validationResult, param } = require("express-validator");

const TaskValidator = [
  body("title").notEmpty().isString().withMessage("Title required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description in a String"),
  // body("status").notEmpty().isString().withMessage("status required"),
  body("assignedTo").notEmpty().isMongoId().withMessage("must required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const validateGetOneTask = [
  param("id").optional().isMongoId().withMessage("Valid task ID required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const TaskUpdateValidator = [
  body("title").notEmpty().optional().isString().withMessage("Title required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description in a String"),
  // body("status")
  //   .notEmpty()
  //   .optional()
  //   .isString()
  //   .withMessage("status required"),
  body("assignedTo")
    .notEmpty()
    .optional()
    .isMongoId()
    .withMessage("must required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = { TaskValidator, TaskUpdateValidator, validateGetOneTask };

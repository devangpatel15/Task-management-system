const express = require("express");
const {
  getAllUsers,
  getUserId,
  createUser,
  updateUsers,
  deleteUser,
  login,
  register,
} = require("../Controller/User");
const { userValidator, userUpdateValidator } = require("../Middleware/User");
const authenticationToken = require("../Middleware/auth");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserId);
router.post("/", userValidator, createUser);
router.put("/:id", userUpdateValidator, updateUsers);
router.delete("/:id", deleteUser);

router.post("/register", register);
router.post("/login", login);
module.exports = router;

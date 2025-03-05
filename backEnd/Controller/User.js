const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getAllUserService,
  getUserIdServices,
  createUserServices,
  updateUserServices,
  deleteUserServices,
  registeredUserService,
} = require("../services/user");

exports.getAllUsers = async (req, res) => {
  try {
    // const user = [1, 2];
    const users = await getAllUserService();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};

exports.getUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const findUserId = await getUserIdServices(userId);
    return res.status(201).send(findUserId);
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;

    await createUserServices(userData);

    return res.status(201).json({ message: "User Successfully Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    await updateUserServices(userId, userData);

    return res.status(201).json({ message: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await deleteUserServices(userId);
    return res.status(201).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};

exports.register = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      password,
      mobileNo,
      countryCode,
      gender,
      dob,
    } = req.body;

    const registerUser = await registeredUserService(userEmail);

    if (registerUser)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName: userName,
      mobileNo: mobileNo,
      countryCode: countryCode,
      userEmail: userEmail,
      gender: gender,
      password: hashedPassword,
      dob: dob,
    });

    newUser.save();

    res.status(201).json({ message: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Bad Request", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    const user = await registeredUserService(userEmail);

    if (!user) return res.status(400).json({ message: "User not Found" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { id: user._id, userEmail: userEmail, password: password },
      "123"
    );
    return res
      .status(200)
      .json({ message: "login successfully", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

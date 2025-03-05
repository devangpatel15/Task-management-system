const User = require("../Models/User");

exports.getAllUserService = async () => {
  const user = await User.find().lean();
  return user;
};

exports.getUserIdServices = async (userId) => {
  const findUserId = await User.findById(userId);
  return findUserId;
};

exports.createUserServices = async (userData) => {
  const createUser = await User.create(userData);
  return createUser;
};

exports.updateUserServices = async (userId, userData) => {
  const updatedUser = await User.findByIdAndUpdate(userId, userData, {
    new: true,
  }).lean();

  return updatedUser;
};

exports.deleteUserServices = async (userId) => {
  const deleteUser = await User.findByIdAndDelete(userId).lean();
  return deleteUser;
};

exports.registeredUserService = async (userEmail) => {
  const registerUser = await User.findOne({ userEmail });
  return registerUser;
};

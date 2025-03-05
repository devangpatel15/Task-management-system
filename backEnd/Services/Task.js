const Task = require("../Models/Task");

exports.getAllTaskServices = async (userId) => {
  const task = await Task.find({ creator: userId })
    .populate("assignedTo creator")
    .lean();
  return task;
};

exports.getTaskIdServices = async (taskId) => {
  const findTaskId = await Task.findById(taskId)
    .populate("assignedTo creator")
    .lean();
  return findTaskId;
};

exports.createTaskServices = async (taskData) => {
  const createTask = await Task.create(taskData);
  return createTask;
};

exports.updateTaskServices = async (taskId, taskData) => {
  const updateTask = await Task.findByIdAndUpdate(taskId, taskData, {
    new: true,
  }).lean();

  return updateTask;
};

exports.deleteTaskServices = async (taskId) => {
  const deleteTask = await Task.findByIdAndDelete(taskId).lean();

  return deleteTask;
};

exports.getAllUserTasksServices = async (userId) => {
  const task = await Task.find({ assignedTo: userId })
    .populate("assignedTo creator")
    .lean();
  return task;
};

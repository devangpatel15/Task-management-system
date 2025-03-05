const Task = require("../Models/Task");
const {
  getAllTaskServices,
  getTaskIdServices,
  createTaskServices,
  updateTaskServices,
  deleteTaskServices,
  getUserTaskService,
  getAllUserTasksServices,
} = require("../Services/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await getAllTaskServices(userId);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};

exports.getAllUsersTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await getAllUserTasksServices(userId);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};

exports.getTaskId = async (req, res) => {
  try {
    const taskId = req.params.id;

    const findTaskId = await getTaskIdServices(taskId);
    return res.status(201).send(findTaskId);
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      creator: req.user.id,
      status: "Pending",
    };

    await createTaskServices(taskData);

    return res.status(201).json({ message: "Task Successfully Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTasks = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;

    await updateTaskServices(taskId, taskData);

    return res.status(201).json({ message: "Task Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    await deleteTaskServices(taskId);
    return res.status(201).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
};

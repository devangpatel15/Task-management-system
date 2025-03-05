const express = require("express");
const {
  getTaskId,
  getAllTasks,
  createTask,
  updateTasks,
  deleteTask,
  getAllUsersTasks,
} = require("../Controller/Task");
const {
  TaskValidator,
  TaskUpdateValidator,
  validateGetOneTask,
} = require("../Middleware/Task");
const authenticationToken = require("../Middleware/auth");

const router = express.Router();

router.get("/getTasks", authenticationToken, validateGetOneTask, getAllTasks);
router.get(
  "/getUserTasks",
  authenticationToken,
  validateGetOneTask,
  getAllUsersTasks
);
router.get("/:id", authenticationToken, validateGetOneTask, getTaskId);
router.post("/createTask", authenticationToken, validateGetOneTask, createTask);
router.put("/:id", authenticationToken, validateGetOneTask, updateTasks);
router.delete("/:id", authenticationToken, validateGetOneTask, deleteTask);
// router.get("/userTasks", authenticationToken, getAllUsersTasks);

module.exports = router;

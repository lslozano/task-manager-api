const express = require("express");

const {
  viewTasks,
  viewTask,
  createTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");
const {
  createComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");
const validateTaskRequiredFields = require("../middlewares/tasklnputValidation");

const taskRouter = express.Router();

// All actions related to Task model
taskRouter.get("/", viewTasks);
taskRouter.post("/", validateTaskRequiredFields, createTask);
taskRouter.get("/:taskId", viewTask);
taskRouter.put("/:taskId", editTask);
taskRouter.delete("/:taskId", deleteTask);

// All actions related to Comment model that is linked to Task
taskRouter.post("/:taskId/comment", createComment);
taskRouter.put("/:taskId/comment/:commentId", editComment);
taskRouter.delete("/:taskId/comment/:commentId", deleteComment);

module.exports = taskRouter;

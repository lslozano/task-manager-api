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

taskRouter.get("/", viewTasks);
taskRouter.post("/", validateTaskRequiredFields, createTask);
taskRouter.get("/:taskId", viewTask);
taskRouter.patch("/:taskId/edit", editTask);
taskRouter.post("/:taskId/comment", createComment);
taskRouter.patch("/:taskId/comment/:commentId/edit", editComment);
taskRouter.delete("/:taskId/comment/:commentId/delete", deleteComment);
taskRouter.delete("/:taskId/delete", deleteTask);

module.exports = taskRouter;

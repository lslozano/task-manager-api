const express = require("express");

const {
  viewTasks,
  viewTask,
  createTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");
const {
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");
const validateTaskRequiredFields = require("../middlewares/tasklnputValidation");

const taskRouter = express.Router();

taskRouter.get("/", viewTasks);
taskRouter.post("/", validateTaskRequiredFields, createTask);
taskRouter.get("/:taskId", viewTask);
taskRouter.patch("/:taskId/edit", editTask);
taskRouter.post("/:taskId/comment", addComment);
taskRouter.post("/:taskId/comment/:commentId", editComment);
taskRouter.delete("/:taskId/comment/:commentId", deleteComment);
taskRouter.delete("/:taskId/delete", deleteTask);

module.exports = taskRouter;

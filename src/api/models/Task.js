const mongoose = require("mongoose");
const CommentService = require("../services/commentService");

const commentService = new CommentService();

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

// Middleware for when a task is deleted, it also removes all related comments.
TaskSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const taskId = this._id;

    await commentService.deleteTaskComments(taskId);

    next();
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = {
  TaskSchema,
  Task,
};

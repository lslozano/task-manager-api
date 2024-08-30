const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  taskId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  CommentSchema,
  Comment,
};

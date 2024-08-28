import mongoose from "mongoose";

export const Comments = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
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

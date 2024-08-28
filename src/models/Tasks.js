import mongoose from "mongoose";

export const TasksSchema = new mongoose.Schema({
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
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

const Tasks = mongoose.model("Tasks", TasksSchema);

export default Tasks;

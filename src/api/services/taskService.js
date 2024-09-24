const DatabaseError = require("../errors/DatabaseError");
const { Task } = require("../models/Task");

const allowedStatus = ["pending", "in progress", "completed"];

class TaskService {
  constructor() {}

  async create(title, createdBy) {
    try {
      const newTask = new Task({
        title,
        createdBy,
      });

      await newTask.save();

      return newTask;
    } catch (error) {
      throw error;
    }
  }

  async findOne(taskId) {
    try {
      const task = await Task.findById(taskId);

      return task;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const tasks = await Task.find();

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async findAssignedTasks(userId) {
    try {
      const assignedTasks = await Task.find({ assignedTo: userId });

      return assignedTasks;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(taskId, newData) {
    try {
      if (newData.status && !allowedStatus.includes(newData.status)) {
        throw new Error("Invalid role");
      }

      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId },
        { ...newData, updatedAt: Date.now() },
        { new: true }
      );

      return updatedTask;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndDelete(taskId) {
    try {
      const task = await Task.findById(taskId);

      if (!task) {
        throw new DatabaseError("Task not found");
      }

      await task.deleteOne();

      return task;
    } catch (error) {
      throw error;
    }
  }

  // Adds the created comment to the corresponding task.
  async findOneAndAddComment(taskId, commentId) {
    try {
      const updatedTask = Task.findOneAndUpdate(
        { _id: taskId },
        { $push: { comments: commentId } },
        { new: true }
      );

      return updatedTask;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndDeleteComment(taskId, commentId) {
    try {
      await Task.findByIdAndUpdate(
        taskId,
        { $pull: { comments: commentId } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskService;

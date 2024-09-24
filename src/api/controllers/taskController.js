const DatabaseError = require("../errors/DatabaseError");
const TaskService = require("../services/taskService");

const taskService = new TaskService();

const createTask = async (req, res, next) => {
  try {
    const { title, createdBy } = req.body;

    const newTask = await taskService.create(title, createdBy);

    if (!newTask) {
      throw new DatabaseError("Failed to create Task");
    }

    const { _id: taskId } = newTask;

    return res.status(200).redirect(`/api/v1/tasks/${taskId}`);
  } catch (error) {
    next(error);
  }
};

const viewTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await taskService.findOne(taskId);

    if (!task) {
      throw new DatabaseError("Could not find task");
    }

    return res.status(200).json({
      message: "Task found",
      task,
    });
  } catch (error) {
    next(error);
  }
};

const viewTasks = async (_, res, next) => {
  try {
    const tasks = await taskService.findAll();

    if (tasks.length === 0) {
      return res.status(200).json({
        message: "No tasks found.",
      });
    }

    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const editTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const body = req.body;

    const taskUpdate = await taskService.findOneAndUpdate(taskId, body);

    if (!taskUpdate) {
      throw new DatabaseError("Failed to update task");
    }

    return res.status(200).json({
      message: "Task updated",
      data: taskUpdate,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const taskDelete = await taskService.findOneAndDelete(taskId);

    if (!taskDelete) {
      throw new DatabaseError("Failed to delete task");
    }

    return res.status(200).redirect("/tasks");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  viewTasks,
  viewTask,
  editTask,
  deleteTask,
};

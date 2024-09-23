const DatabaseError = require("../errors/DatabaseError");
const ProfileService = require("../services/profileService");
const TaskService = require("../services/taskService");
const CommentService = require("../services/commentService");

const profileService = new ProfileService();
const taskService = new TaskService();
const commentService = new CommentService();

const viewProfile = (req, res) => {
  return res.status(200).json({
    message: "Profile accessed",
    user: req.user,
  });
};

const editProfile = async (req, res, next) => {
  try {
    const { username } = req.user;

    const body = req.body;
    const user = await profileService.findOneAndUpdate(res, username, body);

    if (!user) {
      throw new DatabaseError("Failed to update user");
    }

    return res.status(200).json({
      message: "User updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const viewAssignedTasks = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const assignedTasks = await taskService.findAssignedTasks(userId);

    if (assignedTasks.length === 0) {
      return res.status(200).json({
        message: "No tasks assigned.",
      });
    }

    return res.status(200).json({
      tasks: assignedTasks,
    });
  } catch (error) {
    next(error);
  }
};

const viewPublishedComments = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const publishedComments = await commentService.findPublishedComments(
      userId
    );

    if (publishedComments.length === 0) {
      return res.json({
        message: "No published comments.",
      });
    }

    return res.status(200).json({
      comments: publishedComments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  viewProfile,
  editProfile,
  viewAssignedTasks,
  viewPublishedComments,
};

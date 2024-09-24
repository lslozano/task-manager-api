const DatabaseError = require("../errors/DatabaseError");
const TaskService = require("../services/taskService");
const CommentService = require("../services/commentService");

const taskService = new TaskService();
const commentService = new CommentService();

const addCommentToTask = async (taskId, commentId) => {
  const taskUpdate = await taskService.findOneAndAddComment(taskId, commentId);

  if (!taskUpdate) {
    throw new DatabaseError("Failed to add comment");
  }

  return true;
};

const createComment = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { taskId } = req.params;
    const body = req.body;
    const { comment } = body;

    const newComment = await commentService.create(comment, userId, taskId);

    if (!newComment) {
      throw new DatabaseError("Failed to create comment");
    }

    const { _id: commentId } = newComment;

    await addCommentToTask(taskId, commentId);

    return res.status(200).json({
      message: "Comment added",
      newComment,
    });
  } catch (error) {
    next(error);
  }
};

const viewComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await commentService.findOne(commentId);

    if (!comment) {
      throw new DatabaseError("Could not find task");
    }

    return res.status(200).json({
      message: "Comment found",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

const viewComments = async (_, res, next) => {
  try {
    const comments = await commentService.findAll();

    if (comments.length === 0) {
      return res.status(200).json({
        message: "No comments found.",
      });
    }

    return res.status(200).json({
      comments,
    });
  } catch (error) {
    next(error);
  }
};

const editComment = async (req, res, next) => {
  try {
    const { taskId, commentId } = req.params;
    const body = req.body;

    const task = await taskService.findOne(taskId);

    if (task.comments.length === 0) {
      return res.status(200).json({
        message: "No comments for this task to be updated",
      });
    }

    const comment = await commentService.findOneAndUpdate(commentId, body);

    if (!comment) {
      throw new DatabaseError("Failed to update comment");
    }

    return res.status(200).json({
      message: "Comment updated",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { taskId, commentId } = req.params;

    const commentDelete = await commentService.findOneAndDelete(commentId);

    if (!commentDelete) {
      throw new DatabaseError("Failed to delete comment");
    }

    await taskService.findOneAndDeleteComment(taskId, commentId);

    return res.status(200).json({
      message: "Comment deleted",
      data: commentDelete,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  viewComment,
  viewComments,
  editComment,
  deleteComment,
};

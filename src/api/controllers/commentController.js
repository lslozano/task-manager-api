const DatabaseError = require("../errors/DatabaseError");
const { commentService, taskService } = require("../services");

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

const viewComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await commentService.findOne(commentId);

    if (!comment) {
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

const viewComments = async (_, res, next) => {
  try {
    const comments = await commentService.findAll();

    if (!comments) {
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

const editComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const body = req.body;

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

    await taskService.findOneAddDeleteComment(taskId, commentId);

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

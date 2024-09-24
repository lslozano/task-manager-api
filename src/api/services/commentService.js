const DatabaseError = require("../errors/DatabaseError");
const { Comment } = require("../models/Comment");

class CommentService {
  constructor() {}

  async create(comment, userId, taskId) {
    try {
      const newComment = new Comment({
        comment,
        createdBy: userId,
        taskId,
      });

      await newComment.save();

      return newComment;
    } catch (error) {
      throw error;
    }
  }

  async findOne(commentId) {
    try {
      const comment = await Comment.findById(commentId);

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const comments = await Comment.find();

      return comments;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(commentId, newData) {
    try {
      const comment = Comment.findOneAndUpdate(
        { _id: commentId },
        { ...newData },
        { new: true }
      );

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async findPublishedComments(userId) {
    try {
      const publishedComments = await Comment.find({ createdBy: userId });
      return publishedComments;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndDelete(commentId) {
    try {
      const comment = await Comment.findById(commentId);

      if (!comment) {
        throw new DatabaseError("Comment not found");
      }

      await comment.deleteOne();

      return comment;
    } catch (error) {
      throw error;
    }
  }

  // This one relates to the middleware that activates for when a Task is deleted
  async deleteTaskComments(taskId) {
    try {
      await Comment.deleteMany({ taskId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentService;

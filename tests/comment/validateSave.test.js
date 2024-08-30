const mongoose = require("mongoose");
const { CommentSchema } = require("../../src/models/Comment");

const Comment = mongoose.model("Comment", CommentSchema);

describe("Comment Save", () => {
  it("should save the Comment when all required fields are provided", async () => {
    const userId = mongoose.Types.ObjectId;
    const taskId = mongoose.Types.ObjectId;

    const comment = new Comment({
      comment: "This is a new comment",
      createdBy: userId,
      taskId,
    });

    await expect(comment.save()).resolves.toBeDefined();
  });
});

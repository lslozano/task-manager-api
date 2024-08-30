const mongoose = require("mongoose");
const { CommentSchema } = require("../../src/models/Comment");
const {
  expectValidationErrorForFields,
  getMissingRequiredFieldsFromModel,
} = require("../utils/index");

const Comment = mongoose.model("Comment", CommentSchema);

const commentRequiredFields = ["comment", "createBy", "taskId"];

describe("Comment Required Fields Validation", () => {
  it("should not allow creating a comment when all required fields are missing", async () => {
    const comment = new Comment({});

    let err;
    try {
      await comment.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(err, commentRequiredFields);
  });

  it("should not allow creating a comment when only some required fields have been provided", async () => {
    const comment = new Comment({
      comment: "This is a new comment",
    });

    let err;
    try {
      await comment.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(
      err,
      getMissingRequiredFieldsFromModel(commentRequiredFields, comment)
    );
  });

  it("should not allow creating a comment when createdBy type field is not an ObjectId", async () => {
    const taskId = mongoose.Types.ObjectId;

    const comment = new Comment({
      comment: "This is a new comment",
      createdBy: 1,
      taskId: taskId,
    });

    let err;
    try {
      await comment.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(
      err,
      getMissingRequiredFieldsFromModel(commentRequiredFields, comment)
    );
  });

  it("should not allow creating a comment when taskId type field is not an ObjectId", async () => {
    const userId = mongoose.Types.ObjectId;

    const comment = new Comment({
      comment: "This is a new comment",
      createdBy: userId,
      taskId: 1,
    });
  });
});

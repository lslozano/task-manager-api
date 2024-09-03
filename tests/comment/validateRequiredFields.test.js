const mongoose = require("mongoose");
const { CommentSchema } = require("../../src/api/models/Comment");
const {
  getValidationError,
  expectValidationErrorForFields,
  getMissingRequiredFieldsFromModel,
} = require("../utils/index");
const { commentRequiredFields } = require("../../utils/requiredModelsFields");

const Comment = mongoose.model("Comment", CommentSchema);

describe("Comment Required Fields Validation", () => {
  it("should not allow creating a comment when all required fields are missing", async () => {
    const comment = new Comment();

    const error = await getValidationError(comment);

    expectValidationErrorForFields(error, commentRequiredFields);
  });

  it("should not allow creating a comment when only some required fields have been provided", async () => {
    const comment = new Comment({
      comment: "This is a new comment",
    });

    const error = await getValidationError(comment);

    expectValidationErrorForFields(
      error,
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

    const error = await getValidationError(comment);

    expectValidationErrorForFields(
      error,
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

    const error = await getValidationError(comment);

    expectValidationErrorForFields(
      error,
      getMissingRequiredFieldsFromModel(commentRequiredFields, comment)
    );
  });
});

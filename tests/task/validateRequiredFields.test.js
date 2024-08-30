const mongoose = require("mongoose");
const { TaskSchema } = require("../../src/api/models/Task");
const {
  getValidationError,
  expectValidationErrorForFields,
  getMissingRequiredFieldsFromModel,
} = require("../utils/index");

const Task = mongoose.model("Task", TaskSchema);

const taskRequiredFields = ["title", "createdBy"];

describe("Task Required Fields Validation", () => {
  it("should not allow creating a task when all required fields are missing", async () => {
    const task = new Task();

    const error = await getValidationError(task);

    expectValidationErrorForFields(error, taskRequiredFields);
  });

  it("should not allow creating a task when only some required fields have been provided", async () => {
    const task = new Task({
      title: "Task 1",
    });

    const error = await getValidationError(task);

    expectValidationErrorForFields(
      error,
      getMissingRequiredFieldsFromModel(taskRequiredFields, task)
    );
  });

  it("should not allow creating a task when createdBy type field is not an ObjectId", async () => {
    const task = new Task({
      title: "Task 1",
      createdBy: 1,
      createdAt: Date.now,
    });

    const error = await getValidationError(task);

    expectValidationErrorForFields(
      error,
      getMissingRequiredFieldsFromModel(taskRequiredFields, task)
    );
  });
});

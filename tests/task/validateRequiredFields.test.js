const mongoose = require("mongoose");
const { TaskSchema } = require("../../src/models/Task");
const {
  expectValidationErrorForFields,
  getMissingRequiredFieldsFromModel,
} = require("../utils/index");

const Task = mongoose.model("Task", TaskSchema);

const taskRequiredFields = ["title", "createdBy"];

describe("Task Required Fields Validation", () => {
  it("should not allow creating a task when all required fields are missing", async () => {
    const task = new Task();

    let err;

    try {
      await task.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(
      err,
      getMissingRequiredFieldsFromModel(taskRequiredFields, task)
    );
  });

  it("should not allow creating a task when only some required fields have been provided", async () => {
    const task = new Task({
      title: "Task 1",
    });

    let err;

    try {
      await task.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(
      err,
      getMissingRequiredFieldsFromModel(taskRequiredFields, task)
    );
  });

  it("should not allow creating a task when createdBy type field is not an ObjectId", async () => {
    const task = new Task({
      title: "Task 1",
      createdBy: 1,
      createdAt: Date.now,
    });

    let err;

    try {
      await task.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(
      err,
      getMissingRequiredFieldsFromModel(taskRequiredFields, task)
    );
  });
});

const mongoose = require("mongoose");
const { TaskSchema } = require("../../src/api/models/Task");

const Task = mongoose.model("Task", TaskSchema);

describe("Task Save", () => {
  it("should save the Task when all required fields are provided", async () => {
    const userId = new mongoose.Types.ObjectId();

    const task = new Task({
      title: "Task 1",
      createdBy: userId,
    });

    await expect(task.save()).resolves.toBeDefined();
  });
});

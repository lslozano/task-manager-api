const mongoose = require("mongoose");
const { UserSchema } = require("../../src/models/User");

const User = mongoose.model("User", UserSchema);

describe("User Save", () => {
  it("should save the User when all required fields are provided", async () => {
    const user = new User({
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@gmail.com",
      hashPassword: "12345678",
    });

    await expect(user.save()).resolves.toBeDefined();
  });
});

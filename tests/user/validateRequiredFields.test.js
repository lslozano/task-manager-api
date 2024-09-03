const mongoose = require("mongoose");
const { UserSchema } = require("../../src/api/models/User");
const {
  expectValidationErrorForFields,
  getMissingRequiredFieldsFromModel,
} = require("../utils/index");
const { userRequiredFields } = require("../../utils/requiredModelsFields");

const User = mongoose.model("User", UserSchema);

afterEach(async () => {
  await User.deleteMany({});
});

describe("User Required Fields Validation", () => {
  it("should not allow creating a user when all required fields are missing", async () => {
    const user = new User();

    let err;
    try {
      await user.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(
      err,
      getMissingRequiredFieldsFromModel(userRequiredFields, user)
    );
  });

  it("should not allow creating a user when only some required fields have been provided", async () => {
    const user = new User({
      firstName: "John",
      lastName: "Doe",
      hashPassword: "12345678",
    });

    let err;
    try {
      await user.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(
      err,
      getMissingRequiredFieldsFromModel(userRequiredFields, user)
    );
  });

  it("should not allow creating a user when the email format is invalid", async () => {
    const user = new User({
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "invalid-format",
      password: "123456789",
    });

    let err;
    try {
      await user.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(err, ["email"]);
  });

  it("should not allow creating a user when password length is less than eight characters", async () => {
    const user = new User({
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@gmail.com",
      password: "123456",
    });

    let err;
    try {
      await user.validate();
    } catch (error) {
      err = error;
    }

    expectValidationErrorForFields(err, ["password"]);
  });
});

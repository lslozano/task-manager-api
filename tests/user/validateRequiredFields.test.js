const mongoose = require("mongoose");
const { UserSchema } = require("../../src/api/models/User");
const {
  expectValidationErrorForFields,
  getMissingRequiredFieldsFromModel,
  getValidationError,
} = require("../test-utils/index");
const { userRequiredFields } = require("../../utils/requiredModelsFields");

const User = mongoose.model("User", UserSchema);

afterEach(async () => {
  await User.deleteMany({});
});

describe("User Required Fields Validation", () => {
  it("should not allow creating a user when all required fields are missing", async () => {
    const user = new User();

    const error = await getValidationError(user);

    expectValidationErrorForFields(error, userRequiredFields);
  });

  it("should not allow creating a user when only some required fields have been provided", async () => {
    const user = new User({
      firstName: "John",
      lastName: "Doe",
      hashPassword: "12345678",
    });

    const error = await getValidationError(user);

    expectValidationErrorForFields(
      error,
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

    const error = await getValidationError(user);

    expectValidationErrorForFields(error, ["email"]);
  });

  it("should not allow creating a user when password length is less than eight characters", async () => {
    const user = new User({
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@gmail.com",
      password: "123456",
    });

    const error = await getValidationError(user);

    expectValidationErrorForFields(error, ["password"]);
  });
});

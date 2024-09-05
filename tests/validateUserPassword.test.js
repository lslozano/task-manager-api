const bcryptjs = require("bcryptjs");
const ValidationError = require("../src/api/errors/ValidationError");
const hashPassword = require("../utils/hashPassword");
const validateUserPassword = require("../utils/validateUserPassword");

const correctPassword = "123456789";
const invalidPassword = "12234567";

describe("validateUserPassword", () => {
  it("should throw a Validation Error when an invalid password is provided", async () => {
    expect.assertions(2);

    const hashedPassword = await hashPassword(correctPassword);

    try {
      await validateUserPassword(invalidPassword, hashedPassword);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toBe("Invalid Credentials");
    }
  });

  it("should not throw a Validation Error when a valid password is provided", async () => {
    expect.assertions(1);

    const hashedPassword = await hashPassword(correctPassword);

    let err;
    try {
      await validateUserPassword(correctPassword, hashedPassword);
    } catch (error) {
      err = new ValidationError();
    }

    expect(err).toBeUndefined();
  });
});

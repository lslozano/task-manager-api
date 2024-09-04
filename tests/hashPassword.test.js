const hashPassword = require("../utils/hashPassword");

describe("hashPassword", () => {
  it("should throw an error when provided with a value different than a string", async () => {
    const password = 1;

    let err;
    try {
      await hashPassword(password);
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });

  it("should returned a hashed string when provided with a regular string as a password", async () => {
    const password = "12345678";

    const hashedPassword = await hashPassword(password);
    const regexPattern = /^\$2[aby]?\$[0-9]{2}\$[./A-Za-z0-9]{53}$/;

    expect(hashedPassword).toMatch(regexPattern);
  });
});

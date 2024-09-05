const { MongoClient } = require("mongodb");
const { User } = require("../src/api/models/User");
const DatabaseError = require("../src/api/errors/DatabaseError");
const { create, findOne } = require("../src/api/services/userService");

describe("userService", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__);
    db = connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("create", () => {
    it("should throw a DatabaseError when saving a user to the database fails", async () => {
      expect.assertions(2);

      mockSave = jest.spyOn(User.prototype, "save").mockImplementation(() => {
        throw new DatabaseError();
      });

      const mockUser = new User();

      try {
        await mockUser.save();
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseError);
        expect(error.message).toBe("Database operation failed");
      }
    });

    it("should return a user when it was properly saved to the database", async () => {
      const mockUser = {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "johndoe@gmail.com",
        password: "123456789",
      };

      const result = await create(mockUser);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(User);
    });
  });

  describe("findeOne", () => {
    it("should throw an error when a user can not be found in the database", async () => {
      expect.assertions(2);

      const mockUsername = "johndoe";

      mockFindOne = jest.spyOn(User, "findOne").mockImplementation(() => {
        throw new DatabaseError();
      });

      try {
        await findOne(mockUsername);
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseError);
        expect(error.message).toBe("Database operation failed");
      }
    });

    it("should return a user when it has been found in the database", async () => {
      const mockUser = {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "johndoe@gmail.com",
        password: "123456789",
      };

      await create(mockUser);

      const result = await findOne(mockUser.username);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(User);
    });
  });
});

const UserService = require("./userService");
const createToken = require("../../../utils/createToken");
const hashPassword = require("../../../utils/hashPassword");
const createCookie = require("../middlewares/createCookie");

const userService = new UserService();
const allowedRoles = ["user", "admin"];

class ProfileService {
  constructor() {}

  async findOneAndUpdate(res, username, newData) {
    try {
      if (newData.role && !allowedRoles.includes(newData.role)) {
        throw new Error("Invalid role");
      }

      const newPassword = newData["password"];

      if (newPassword) {
        const hashedPassword = await hashPassword(newPassword);

        const userData = { username, password: hashedPassword };
        const newToken = createToken(userData);

        createCookie(res, newToken);

        newData["password"] = hashedPassword;
      }

      const user = await userService.findOneAndUpdate(username, newData);

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProfileService;

const { User } = require("../models/User");
const hashPassword = require("../../../utils/hashPassword");

class UserService {
  constructor() {}

  async create(data) {
    try {
      const { firstName, lastName, username, email, password } = data;

      const hashedPassword = await hashPassword(password);

      const user = new User({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(username) {
    try {
      const user = await User.findOne({ username });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(username, newData) {
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { ...newData },
        { new: true }
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndDelete(userId) {
    try {
      await User.findOneAndDelete({ _id: userId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;

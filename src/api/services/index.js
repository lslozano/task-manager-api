const UserService = require("./userService");
const ProfileService = require("./profileService");
const TaskService = require("./taskService");
const CommentService = require("./commentService");

const userService = new UserService();
const profileService = new ProfileService();
const taskService = new TaskService();
const commentService = new CommentService();

module.exports = { userService, profileService, taskService, commentService };

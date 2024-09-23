const express = require("express");
const { logoutUser, deleteUser } = require("../controllers/userController.js");
const {
  viewProfile,
  editProfile,
  viewAssignedTasks,
  viewPublishedComments,
} = require("../controllers/profileController.js");

const profileRouter = express.Router();

// All available actions at Profile
profileRouter.get("/", viewProfile);
profileRouter.patch("/edit", editProfile);
profileRouter.get("/tasks", viewAssignedTasks);
profileRouter.get("/comments", viewPublishedComments);

// Calls User controllers to logout or delete.
profileRouter.post("/logout", logoutUser);
profileRouter.delete("/delete", deleteUser);

module.exports = profileRouter;

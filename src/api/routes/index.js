const express = require("express");

const authenticateToken = require("../middlewares/authenticateToken");
const homeRoute = require("./homeRoute");
const userRoutes = require("./userRoutes");
const profileRoutes = require("./profileRoutes");
const taskRoutes = require("./taskRoutes");
comment;

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", userRoutes);
  router.use("/profile", authenticateToken, profileRoutes);
  router.use("/tasks", authenticateToken, taskRoutes);
  router.use("/comments", authenticateToken, commentRoutes);
  router.use("/", homeRoute);

  app.get("/users", (_, res) => res.redirect("/api/v1/users/register"));
  app.get("/profile", (_, res) => res.redirect("/api/v1/profile"));
  app.get("/tasks", (_, res) => res.redirect("/api/v1/tasks"));
  app.get("/", (_, res) => res.redirect("/api/v1"));

  app.all("*", (_, res) => {
    res.status(404).json({ message: "Page not found." });
  });
};

module.exports = routerApi;

const express = require("express");

const authenticateToken = require("../middlewares/authenticateToken");
const homeRoute = require("./homeRoute");
const userRoutes = require("./userRoutes");
const profileRoutes = require("./profileRoutes");

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/", homeRoute);

  router.use("/users", userRoutes);

  router.use("/profile", authenticateToken, profileRoutes);

  app.get("/", (_, res) => res.redirect("/api/v1"));
  app.get("/users", (_, res) => res.redirect("/api/v1/users/register"));
  app.get("/profile", (_, res) => res.redirect("/api/v1/profile"));
};

module.exports = routerApi;

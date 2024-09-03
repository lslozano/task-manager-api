const express = require("express");

const homeRoute = require("./homeRoute");
const userRoutes = require("./userRoutes");

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/", homeRoute);

  router.use("/users", userRoutes);

  app.get("/", (_, res) => res.redirect("/api/v1"));
  app.get("/users", (_, res) => res.redirect("/api/v1/users/register"));
};

module.exports = routerApi;

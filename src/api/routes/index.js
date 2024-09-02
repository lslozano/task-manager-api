const express = require("express");

const homeRoutes = require("./homeRoutes");
const signupRoutes = require("./signupRoutes");

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/", homeRoutes);
  router.use("/signup", signupRoutes);

  app.get("/", (_, res) => res.redirect("/api/v1"));
  app.get("/signup", (_, res) => res.redirect("/api/v1/signup"));
};

module.exports = routerApi;

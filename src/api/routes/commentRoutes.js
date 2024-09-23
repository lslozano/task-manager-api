const express = require("express");
const {
  viewComments,
  viewComment,
} = require("../controllers/commentController");

const commentRouter = express.Router();

commentRouter.get("/", viewComments);
commentRouter.get("/:commentId", viewComment);

module.exports = commentRouter;

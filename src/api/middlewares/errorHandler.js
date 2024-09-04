require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT || "dev";

const logError = (error, req, res, next) => {
  if (ENVIRONMENT === "dev") {
    console.log(error.message);
    next(error);
  }

  console.log("Something went wrong.");
  next(error);
};

const errorHandler = (error, req, res) => {
  if (ENVIRONMENT === "dev" && error.statusCode) {
    res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
      stack: error.stack,
    });
  }

  res.status(500).json({
    error: "Internal server error.",
    message: "Something went wrong.",
  });
};

module.exports = {
  logError,
  errorHandler,
};

class ValidationError extends Error {
  constructor(message = "Credentials are invalid") {
    super(message);
    this.name = "Validation Error";
    this.statusCode = 403;
  }
}

module.exports = ValidationError;

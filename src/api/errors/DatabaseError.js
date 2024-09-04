class DatabaseError extends Error {
  constructor(message = "Database operation failed") {
    super(message);
    this.name = "DatabaseError";
    this.statusCode = 500;
  }
}

module.exports = DatabaseError;

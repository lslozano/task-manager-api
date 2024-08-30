require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./config/database.js");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`[server] Connected to port ${PORT}`)
);

connectDB();

process.on("unhandledRejection", (err) => {
  console.error(`[server] An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

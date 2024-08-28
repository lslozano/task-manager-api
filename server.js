import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/database.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`[server] Connected to port ${PORT}`)
);

connectDB();

process.on("unhandledRejection", (err) => {
  console.error(`[server] An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

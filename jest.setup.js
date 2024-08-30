const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  if (!mongoServer) {
    throw new Error("Cannot create mongo server");
  }

  const uri = mongoServer.getUri();

  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  } catch (error) {
    console.error("Error dropping and closing server", error);
  }
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

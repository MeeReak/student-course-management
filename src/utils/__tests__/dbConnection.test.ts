import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, disconnect } from "../dbconnection";
import { logger } from "../logger";

// Mock the logger module
jest.mock("../logger");

describe("MongoDB Connection", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
  });

  afterAll(async () => {
    await mongoServer.stop();
    jest.clearAllMocks(); // Reset mocks for each test
  });

  it("should connect to MongoDB and log success message", async () => {
    const url = mongoServer.getUri();
    await connect({ url });

    expect(mongoose.connection.readyState).toBe(1); // 1: connected
    expect(logger.info).toHaveBeenCalledWith(
      "Successfully connected to MongoDB"
    );
  });

  it("should log error message on connection failure", async () => {
    const error = new Error("Connection failed");
    jest.spyOn(mongoose, "connect").mockImplementationOnce(() => {
      throw error;
    });

    await connect({ url: "invalid-url" });

    expect(logger.error).toHaveBeenCalledWith(
      "Initial MongoDB connection error",
      { err: error }
    );
  });

  it("should disconnect from MongoDB and remove all listeners", async () => {
    await disconnect();

    expect(mongoose.connection.readyState).toBe(0); // 0: disconnected
    expect(logger.info).toHaveBeenCalledWith(
      "MongoDB disconnected and listeners removed"
    );
  });
});

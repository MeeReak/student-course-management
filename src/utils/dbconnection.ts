import mongoose from "mongoose";
import { logger } from "./logger";

let mongoUrl = "";
const db = mongoose.connection;

const setupEventListeners = () => {
  db.on("connected", () => {
    logger.info("MongoDB connected");
  });

  db.on("error", (error) => {
    logger.error("Error in MongoDB connection", { error });
  });

  db.on("disconnected", () => {
    logger.info("MongoDB disconnected");
  });
};

setupEventListeners();

const connect = async ({ url }: { url: string }) => {
  mongoUrl = url;
  try {
    await mongoose.connect(mongoUrl);
    logger.info("Successfully connected to MongoDB");
  } catch (err) {
    logger.error("Initial MongoDB connection error", { err });
  }
};

const disconnect = async () => {
  await mongoose.disconnect();
  db.removeAllListeners();
  logger.info("MongoDB disconnected and listeners removed");
};

export { connect, disconnect };

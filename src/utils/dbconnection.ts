import mongoose from "mongoose";
import { logger } from "./logger";

let mongoUrl = "";

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
  logger.info("MongoDB disconnected and listeners removed");
};

export { connect, disconnect };

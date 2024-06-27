import app from "./app";
import getConfig from "./utils/createConfig";
import { connect, disconnect } from "./utils/dbconnection";
import { logger, logInit } from "./utils/logger";

async function run() {
  try {
    console.log();
    // Get Config
    const config = getConfig(process.env.NODE_ENV);

    // Initialize logger before any logging happens
    logInit({ env: process.env.NODE_ENV!, logLevel: config.logLevel });

    // Activate Database
    await connect({ url: config.db_url! });

    // Start Server
    const server = app.listen(config.port, () => {
      logger.info(`Server is listening on port: ${config.port}`);
    });

    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          logger.info("Server closed!");
          await disconnect();

          // Gracefully Terminate
          process.exit(1); // terminate the process due to error
        });
      } else {
        await disconnect(); // In case the server isn't running but DB needs to be disconnected
        logger.info("MongoDB disconnected.");
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error: unknown) => {
      logger.error("Unhandled error", { error });
      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler); // Synchronous
    process.on("unhandledRejection", unexpectedErrorHandler); // Asynchronous

    // A termination signal typically sent from OS or other software (DOCKER, KUBERNETES)
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      if (server) {
        // Stop the server from accepting new requests but keep existing connections open until all ongoing requests are done
        server.close();
      }
    });
  } catch (error: any | unknown) {
    // Ensure logger is initialized before logging any errors
    if (logger) {
      logger.error("Failed to initialize application", { error });
    } else {
      console.error("Failed to initialize application", error);
    }
    process.exit(1);
  }
}

run();

import path from "path";
import getConfig from "../createConfig";
const dotenv = require("dotenv"); // Assuming dotenv is installed

// Mock dotenv to avoid modifying actual environment variables
jest.mock("dotenv");

describe("getConfig", () => {
  beforeEach(() => {
    dotenv.config.mockReset(); // Clear mock configuration for each test
  });

  it("throws an error for missing required environment variables", () => {
    process.env = {}; // Ensure no environment variables are set initially

    expect(() => getConfig()).toThrowError(
      "Missing required environment variables: NODE_ENV, PORT, DB_URL, LOG_LEVEL"
    );
  });

  it("returns a configuration object with loaded environment variables (dev env)", () => {
    process.env.NODE_ENV = "dev";
    process.env.PORT = "3000";
    process.env.DB_URL = "mongodb://localhost:27017/mydatabase";
    process.env.LOG_LEVEL = "info";

    const config = getConfig();

    expect(config).toEqual({
      env: "dev",
      port: "3000",
      db_url: "mongodb://localhost:27017/mydatabase",
      logLevel: "info",
    });
  });

  it("returns a configuration object with loaded environment variables (custom env)", () => {
    process.env.NODE_ENV = "staging";
    process.env.PORT = "8080";
    process.env.DB_URL = "mongodb://staging-host:27017/mydatabase";
    process.env.LOG_LEVEL = "debug";

    const config = getConfig("staging");

    expect(config).toEqual({
      env: "staging",
      port: "8080",
      db_url: "mongodb://staging-host:27017/mydatabase",
      logLevel: "debug",
    });
  });

  it("uses the correct config path for the specified environment", () => {
    const devConfigPath = path.join(__dirname, "../../../config/.env");
    const stagingConfigPath = path.join(__dirname, "../../../config/.env.staging");

    getConfig();
    expect(dotenv.config).toHaveBeenCalledWith({ path: devConfigPath });

    getConfig("staging");
    expect(dotenv.config).toHaveBeenCalledWith({ path: stagingConfigPath });
  });
});

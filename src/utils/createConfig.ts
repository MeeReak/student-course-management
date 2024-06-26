import dotenv from "dotenv";
import path from "path";

function createConfig(configPath: string) {
  dotenv.config({ path: configPath });

  // Validate essential configuration
  const requiredConfig = ["NODE_ENV", "PORT", "DB_URL", "LOG_LEVEL"];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingConfig.join(", ")}`
    );
  }

  // Return configuration object
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    db_url: process.env.DB_URL,
  };
}

const getConfig = (currentEnv: string = "dev") => {
  const configPath =
    currentEnv === "dev"
      ? path.join(__dirname, `../../config/.env`)
      : path.join(__dirname, `../../config/.env.${currentEnv}`);
  return createConfig(configPath);
};

export default getConfig;

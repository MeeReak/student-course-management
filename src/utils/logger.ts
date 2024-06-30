import winston from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

// Create a Winston Logger with a default Console transport
export const logger = winston.createLogger({
  format: combine(
    colorize({ all: true }),
    timestamp(),
    align(),
    printf((info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      level: "info", // Default level
    }),
  ],
});

export const logInit = ({
  env = "dev",
  logLevel,
}: {
  env: string | undefined;
  logLevel: string | undefined;
}) => {
  // Clear default transports
  logger.clear();

  // Output Logs to the Console (Unless it's Testing)
  logger.add(
    new winston.transports.Console({
      level: logLevel,
      silent: env === "testing",
    })
  );
};

export const logDestroy = () => {
  logger.clear();
  logger.close();
};

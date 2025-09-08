const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const fs = require("fs");

function initialiseLogger() {
  const logDir = path.resolve(__dirname, "../../../log");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.printf(({ timestamp, level, message }) => {
        const logMessage = Array.isArray(message)
          ? message
              .map((msg) =>
                typeof msg === "object" ? JSON.stringify(msg, null, 2) : msg
              )
              .join(" ")
          : typeof message === "object"
          ? JSON.stringify(message, null, 2)
          : message;
        return `${timestamp} ${level}: ${logMessage}`;
      })
    ),
    transports: [
      new DailyRotateFile({
        filename: `${logDir}/serverdashboard-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        maxFiles: "30d",
      }),
    ],
    exitOnError: false,
  });

  // Conditionally override console methods only in production
  if (process.env.LOG_FOLDER === "true") {
    console.log = (...args) => logger.info(args.join(" "));
    console.error = (...args) => logger.error(args.join(" "));
    console.warn = (...args) => logger.warn(args.join(" "));
    console.info = (...args) => logger.info(args.join(" "));
    console.debug = (...args) => logger.debug(args.join(" "));
  }

  return logger;
}

module.exports = initialiseLogger;

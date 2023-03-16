import winston from "winston"

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

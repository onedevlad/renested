import { injectable } from "inversify"
import winston from "winston"

interface ILoggerOptions {
  logLevel: string
}

@injectable()
export class Logger {
  public logger: winston.Logger

  init({ logLevel }: ILoggerOptions) {
    this.logger = winston.createLogger({
      level: logLevel.toString(),
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
  }
}

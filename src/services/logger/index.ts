import { injectable } from "inversify"
import winston from "winston"

interface ILoggerOptions {
  logLevel: string
}

@injectable()
export class Logger {
  private _logger: winston.Logger

  init({ logLevel }: ILoggerOptions) {
    this._logger = winston.createLogger({
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

  box(msg: string) {
    const tab = ' '.repeat(4)
    const paddedMsg = tab + msg + tab
    const placeholder = ' '.repeat(paddedMsg.length)

    const msgContent = `${placeholder}\n${paddedMsg}\n${placeholder}`
    const lines = msgContent.split('\n')
    const width = paddedMsg.length

    const horizonalAddornment = `+${'-'.repeat(width)}+`
    const content = '\n' + lines.map(l => `|${l}|`).join('\n') + '\n'
    return `\n\n${horizonalAddornment}${content}${horizonalAddornment}\n`
  }

  get logger() {
    return this._logger
  }
}

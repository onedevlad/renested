import { injectable } from 'inversify'
import winston, { transports, format } from 'winston'

interface ILoggerOptions {
  logLevel: string
}

const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

@injectable()
export class Logger {
  private _logger: winston.Logger

  init({ logLevel }: ILoggerOptions) {
    this._logger = winston.createLogger({
      level: logLevel,
      format: format.combine(
        format.timestamp({ format: 'HH:mm:ss:SSS' }),
        format.colorize(),
        customFormat
      ),
      transports: [new transports.Console()],
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
    const content = '\n' + lines.map((l) => `|${l}|`).join('\n') + '\n'
    return `\n\n${horizonalAddornment}${content}${horizonalAddornment}\n`
  }

  get logger() {
    return this._logger
  }
}

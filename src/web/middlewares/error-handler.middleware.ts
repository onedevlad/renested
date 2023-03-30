import { NextFunction, type Request, type Response } from 'express'
import { BaseHttpResponse } from 'web/lib/base-http-response'
import { Logger } from 'services/logger'
import {
  ValidationException,
  HttpException,
  UnauthorizedException,
} from 'exceptions/index'

export class ErrorHandlerMiddleware {
  constructor(private readonly logger: Logger) { }

  sendResponse(res: Response, msg: string | string[], statusCode: number) {
    const response = BaseHttpResponse.error(msg, statusCode)
    return res.status(response.statusCode).json(response)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpException) {
      const { error, statusCode } = err

      return this.sendResponse(res, error.message, statusCode)
    }

    if (err instanceof UnauthorizedException) {
      return this.sendResponse(res, err.message, 403)
    }

    if (err instanceof ValidationException) {
      return this.sendResponse(res, err.msgs, 422)
    }

    this.logger.error(err)

    return this.sendResponse(res, err.message, 500)
  }
}

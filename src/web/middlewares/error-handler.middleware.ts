import { NextFunction, type Request, type Response } from 'express'
import { BaseHttpResponse } from 'web/lib/base-http-response'
import { Logger } from 'services/logger'
import { ValidationException, HttpException, UnauthorizedException } from 'exceptions/index'

export class ErrorHandlerMiddleware {
  constructor(private readonly logger: Logger['logger']) {}

  sendResponse(res: Response, error: Error, statusCode: number) {
    const response = BaseHttpResponse.error(error.message, statusCode)
    return res.status(response.statusCode).json(response)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpException) {
      const { error, statusCode } = err

      return this.sendResponse(res, error, statusCode)
    }

    if (err instanceof UnauthorizedException) {
      return this.sendResponse(res, err, 403)
    }

    if (err instanceof ValidationException) {
      return this.sendResponse(res, err, 422)
    }

    console.log(err) // TODO: make winston log errors 

    return this.sendResponse(res, err, 500)
  }
}

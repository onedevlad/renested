import { NextFunction, type Request, type Response } from 'express'
import { UserAlreadyExistsException, ValidationException } from 'exceptions/index'
import { BaseHttpResponse } from 'web/lib/base-http-response'

export class ErrorHandlerMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static execute(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ValidationException) {
      const response = BaseHttpResponse.error(err.msgs, 422)
      return res.status(response.statusCode).json(response)
    }

    if (err instanceof UserAlreadyExistsException) {
      const response = BaseHttpResponse.error(err.message, 422)
      return res.status(response.statusCode).json(response)
    }

    const response = BaseHttpResponse.error(err.message, 500)
    return res.status(response.statusCode).json(response)
  }
}

import { NextFunction, type Request, type Response } from 'express'
import {
  InvalidCredentialsException,
  UserAlreadyExistsException,
  ValidationException,
} from 'exceptions/index'
import { BaseHttpResponse } from 'web/lib/base-http-response'
import { Logger } from 'services/logger'

export class ErrorHandlerMiddleware {
  constructor(private readonly logger: Logger['logger']) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ValidationException) {
      const response = BaseHttpResponse.error(err.msgs, 422)
      return res.status(response.statusCode).json(response)
    }

    if (err instanceof UserAlreadyExistsException) {
      const response = BaseHttpResponse.error(err.message, 422)
      return res.status(response.statusCode).json(response)
    }

    if (err instanceof InvalidCredentialsException) {
      const response = BaseHttpResponse.error(err.message, 403)
      return res.status(response.statusCode).json(response)
    }

    console.log(err)
    const response = BaseHttpResponse.error(err.message, 500)
    return res.status(response.statusCode).json(response)
  }
}

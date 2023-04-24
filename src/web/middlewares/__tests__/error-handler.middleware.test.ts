import { MockProxy, mock } from "jest-mock-extended"
import { NextFunction, Request, Response } from "express"

import { HttpException } from "exceptions/http.exception"
import { IException } from "utils/types"
import { Logger } from "services/logger"
import { UnauthorizedException } from "exceptions/unauthorized.exception"
import { ValidationException } from "exceptions/validation.exception"

import { ErrorHandlerMiddleware } from "../error-handler.middleware"

class Exception extends Error implements IException {
  constructor(msg?: string) { super(msg) }
}

const setup = (
  err: Error = new Error(),
  res: MockProxy<Response> = mock<Response>(),
  logger: Logger = mock<Logger>()
) => {
  const req = mock<Request>()
  const nextFn = mock<NextFunction>()
  const handler = new ErrorHandlerMiddleware(logger)

  res.status.mockReturnThis()

  handler.execute(err, req, res, nextFn)
}

describe('Error handler middlware', () => {
  it('Should handle HttpException', () => {
    const [errorMessage, statusCode] = ["Something went wrong", 400]
    const error = new HttpException(new Exception(errorMessage), statusCode)
    const res = mock<Response>()

    setup(error, res)

    expect(res.status).toHaveBeenCalledWith(statusCode)
    expect(res.json).toHaveBeenCalledWith({
      data: null,
      errors: [errorMessage],
      statusCode: 400,
    })
  })

  it("Should handle UnauthorizedException", () => {
    const error = new UnauthorizedException()
    const res = mock<Response>()

    setup(error, res)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 403,
      data: null,
      errors: [expect.any(String)],
    })
  })

  it("Should handle ValidationException", () => {
    const errorMessage = 'Validation error'
    const error = new ValidationException([errorMessage])
    const res = mock<Response>()

    setup(error, res)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 422,
      data: null,
      errors: [errorMessage],
    })
  })

  it("Should handle unknown exceptions", () => {
    const errorMessage = 'Something went wrong'
    const error = new Exception(errorMessage)
    const res = mock<Response>()
    const logger = mock<Logger>()

    setup(error, res, logger)

    expect(logger.error).toHaveBeenCalledWith(error)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      data: null,
      statusCode: 500,
      errors: [errorMessage],
    })
  })
})

import type { Request, Response, NextFunction } from 'express'
import { ValidationError, validateSync } from 'class-validator'
import { BaseMiddleware } from 'web/lib/base-middleware'
import { ValidationException } from 'exceptions/validation.exception'
import { ValidatorOptions } from 'class-validator'

type Class<T = unknown> = { new (...args: unknown[]): T }

const validatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: false,
  forbidUnknownValues: false,
  skipUndefinedProperties: true,
}

const formatValidationError = (e: ValidationError) => Object.values(e.constraints)

export class ValidateRequestMiddleware extends BaseMiddleware {
  constructor(
    private readonly dtoClass: Class,
    private readonly withParams = false
  ) {
    super()
  }

  public execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): void | Promise<void> {
    const body = this.withParams
      ? { ...req.body, ...req.params }
      : req.body

    const dto = Object.assign(new this.dtoClass(), body)

    const errors = validateSync(dto, validatorOptions)
    if (errors.length) {
      throw new ValidationException(errors.flatMap(formatValidationError))
    }

    req.body = dto

    next()
  }

  static with(dto: Class) {
    return new ValidateRequestMiddleware(dto, false).execute
  }

  static withParams(dto: Class) {
    return new ValidateRequestMiddleware(dto, true).execute
  }
}

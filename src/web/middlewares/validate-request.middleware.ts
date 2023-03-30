import { ValidationError, validateSync } from 'class-validator'
import { ValidatorOptions } from 'class-validator'

import type { Request, Response, NextFunction } from 'express'
import { BaseMiddleware } from 'web/lib/base-middleware'
import { ValidationException } from 'exceptions/validation.exception'
import { Class } from 'utils/types'

const validatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: false,
  forbidUnknownValues: false,
}

export class ValidateRequestMiddleware extends BaseMiddleware {
  constructor(
    private readonly dtoClass: Class,
    private readonly withParams = false
  ) {
    super()
  }

  formatValidationError(e: ValidationError) {
    return e.constraints ? Object.values(e.constraints) : []
  }

  public execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): void | Promise<void> {
    const body = this.withParams ? { ...req.body, ...req.params } : req.body

    const dto = Object.assign(new this.dtoClass(), body)

    const errors = validateSync(dto, validatorOptions)
    if (errors.length) {
      throw new ValidationException(errors.flatMap(this.formatValidationError))
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

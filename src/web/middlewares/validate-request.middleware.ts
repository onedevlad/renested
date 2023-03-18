import type { Request, Response, NextFunction } from 'express'
import { BaseMiddleware } from 'web/lib/base-middleware'

export class ValidateRequestMiddleware extends BaseMiddleware {
  constructor(
    private readonly dtoClass: { from: any },
    private readonly withParams = false
  ) {
    super()
  }

  public execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): void | Promise<void> {
    if (this.withParams) {
      Object.assign(req.body, req.params)
    }

    req.body = this.dtoClass.from(req.body)

    next()
  }

  static with(dto: any) {
    return new ValidateRequestMiddleware(dto, false).execute
  }

  static withParams(dto: any) {
    return new ValidateRequestMiddleware(dto, true).execute
  }
}

import { NextFunction, Request, Response } from "express"
import { injectable } from "inversify"
import { BaseMiddleware } from "inversify-express-utils"

import { UnauthorizedException } from "exceptions/unauthorized.exception"

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  handler(req: Request, _res: Response, next: NextFunction) {
    const tokenData = this.httpContext.user.details

    if (!tokenData) throw new UnauthorizedException()

    req.context.tokenData = tokenData
    next()
  }
}

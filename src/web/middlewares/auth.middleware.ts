import { NextFunction, Request, Response } from "express"
import { inject, injectable } from "inversify"
import { BaseMiddleware } from "inversify-express-utils"

import { UnauthorizedException } from "exceptions/unauthorized.exception"
import { TokenService } from "services/token/token.service"
import { Principal } from "web/lib/auth-principal"

const tokenService = inject(TokenService)

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  @tokenService private readonly tokenService: TokenService

  handler(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization ?? ''

    if (!token) throw new UnauthorizedException()

    const tokenData = this.tokenService.validateToken(token)
    if (!tokenData) throw new UnauthorizedException()

    req.context.user = new Principal(tokenData) || null

    next()
  }
}

import { Request } from 'express'
import { injectable, inject } from 'inversify'
import { interfaces } from 'inversify-express-utils'
import { TokenService } from 'services/token/token.service'
import { Principal } from './auth-principal'

const tokenService = inject(TokenService)

@injectable()
export class AuthProvider implements interfaces.AuthProvider {
  @tokenService private readonly tokenService: TokenService

  public async getUser(req: Request): Promise<interfaces.Principal> {
    const token = req.headers.authorization
    const user = this.tokenService.parseToken(token ?? '')

    return new Principal(user)
  }
}

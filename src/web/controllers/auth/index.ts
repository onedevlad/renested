import { CreateUserDto } from 'dtos/auth/create-user.dto'
import type { Request, Response } from 'express'
import { BaseHttpResponse } from 'web/lib/base-http-response'
import { ValidateRequestMiddleware } from 'web/middlewares/validate-request.middleware'
import { controller, httpPost } from 'inversify-express-utils'

import { LoginDataDto } from 'dtos/auth/login-data.dto'
import { RegisterUserUseCase } from 'use-cases/auth/register-user.use-case'
import { LoginUseCase } from 'use-cases/auth/login.use-case'

@controller("/auth")
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @httpPost('/login', ValidateRequestMiddleware.with(LoginDataDto))
  async login(req: Request<unknown, LoginDataDto>, res: Response) {
    const token = await this.loginUseCase.execute(req.body)

    const response = BaseHttpResponse.success(token)
    res.json(response)
  }

  @httpPost("/register", ValidateRequestMiddleware.with(CreateUserDto))
  async register(req: Request<unknown, CreateUserDto>, res: Response) {
    const user = await this.registerUserUseCase.execute(req.body)

    const response = BaseHttpResponse.success(user)
    res.json(response)
  }
}

import { CreateUserDto } from 'dtos/users/create-user.dto'
import type { Request, Response } from 'express'
import { BaseHttpResponse } from 'frameworks/web/lib/base-http-response'
import { ValidateRequestMiddleware } from 'frameworks/web/middlewares/validate-request.middleware'
import { controller, httpPost } from 'inversify-express-utils'

import { CreateUserUseCase } from 'use-cases/auth/create-user.use-case'

@controller("/users")
export class AuthController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @httpPost("/register", ValidateRequestMiddleware.with(CreateUserDto))
  async save(req: Request, res: Response) {
    const user = await this.createUserUseCase.exec(req.body)

    const response = BaseHttpResponse.success(user)
    res.json(response)
  }
}

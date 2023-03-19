import { CreateUserDto } from 'dtos/users/create-user.dto'
import type { Request, Response } from 'express'
import { BaseHttpResponse } from 'web/lib/base-http-response'
import { ValidateRequestMiddleware } from 'web/middlewares/validate-request.middleware'
import { controller, httpGet, httpPost } from 'inversify-express-utils'

import { UserService } from 'services/user/user.service'
import { PaginationMiddleware, PaginatedResponse } from 'web/middlewares/pagination.middleware'

@controller("/users")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @httpGet("/", PaginationMiddleware)
  async index(_req: Request, res: PaginatedResponse) {
    const users = await this.userService.listUsers(res.locals.pagination)

    const response = BaseHttpResponse.success(users)
    res.json(response)
  }

  @httpPost("/register", ValidateRequestMiddleware.with(CreateUserDto))
  async save(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body)

    const response = BaseHttpResponse.success(user)
    res.json(response)
  }
}

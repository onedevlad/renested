import {
  controller,
  httpDelete,
  httpGet,
  requestParam,
  response,
} from 'inversify-express-utils'
import { BaseController } from 'web/lib/base-controller'
import { AuthMiddleware } from 'web/middlewares/auth.middleware'
import {
  PaginatedResponse,
  PaginationMiddleware,
} from 'web/middlewares/pagination.middleware'
import { ListUsersUseCase } from './use-cases/list-users.use-case'
import { ValidateRequestMiddleware } from 'web/middlewares/validate-request.middleware'
import { DeleteUserDto, DeleteUserRequestDto } from './dto'
import { DeleteUserUseCase } from './use-cases/delete-user.use-case'
import { Response } from 'express'

@controller('/users')
export class UserController extends BaseController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {
    super()
  }

  @httpGet('/', AuthMiddleware, PaginationMiddleware)
  async index(@response() res: PaginatedResponse) {
    return this.executeUseCase(
      this.listUsersUseCase,
      res.locals.pagination,
      res
    )
  }

  @httpDelete(
    '/:id',
    AuthMiddleware,
    ValidateRequestMiddleware.withParams(DeleteUserRequestDto)
  )
  async deleteUser(@requestParam('id') id: string, @response() res: Response) {
    const myUserId = this.httpContext.user.getUserId()

    const dto = DeleteUserDto.from({ id: +id, myUserId })
    return this.executeUseCase(this.deleteUserUseCase, dto, res)
  }
}

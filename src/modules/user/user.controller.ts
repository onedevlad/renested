import { controller, httpGet, response } from 'inversify-express-utils'
import { BaseController } from 'web/lib/base-controller'
import { AuthMiddleware } from 'web/middlewares/auth.middleware'
import { PaginatedResponse, PaginationMiddleware } from 'web/middlewares/pagination.middleware'
import { ListUsersUseCase } from './use-cases/list-users.use-case'

@controller('/users')
export class UserController extends BaseController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) { super() }

  @httpGet('/', AuthMiddleware, PaginationMiddleware)
  async index(@response() res: PaginatedResponse) {
    return this.executeUseCase(this.listUsersUseCase, res.locals.pagination, res)
  }
}

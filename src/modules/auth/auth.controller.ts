import { Request, Response } from 'express'
import { controller, httpPost } from 'inversify-express-utils'

import { ValidateRequestMiddleware } from 'web/middlewares/validate-request.middleware'
import { LoginDataDto, CreateUserDto } from './dto'
import { RegisterUserUseCase } from './use-cases/register-user.use-case'
import { LoginUseCase } from './use-cases/login.use-case'
import {
  UserAlreadyExistsException,
  InvalidCredentialsException,
} from 'modules/auth/exceptions'
import { BaseController } from 'web/lib/base-controller'
import { handleErrors } from 'web/lib/decorators/error-handler.decorator'

@controller('/auth')
export class AuthController extends BaseController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase
  ) {
    super()
  }

  @httpPost('/login', ValidateRequestMiddleware.with(LoginDataDto))
  @handleErrors([[InvalidCredentialsException, 403]])
  async login(req: Request<unknown, LoginDataDto>, res: Response) {
    return this.executeUseCase(this.loginUseCase, req.body, res)
  }

  @httpPost('/register', ValidateRequestMiddleware.with(CreateUserDto))
  @handleErrors([[UserAlreadyExistsException, 422]])
  async register(req: Request<unknown, CreateUserDto>, res: Response) {
    return this.executeUseCase(this.registerUserUseCase, req.body, res)
  }
}

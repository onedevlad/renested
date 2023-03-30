import { Response } from 'express'
import { injectable } from 'inversify'
import { BaseHttpController, HttpContext } from 'inversify-express-utils'

import { IUseCase } from 'utils/types'
import { BaseHttpResponse } from './base-http-response'
import { Principal } from './auth-principal'

interface PrincipalHttpContext extends HttpContext {
  user: Principal
}

@injectable()
export class BaseController extends BaseHttpController {
  protected readonly httpContext: PrincipalHttpContext
  protected async executeUseCase<InputDto, OutputDto>(
    useCase: IUseCase<InputDto, OutputDto>,
    input: InputDto,
    res: Response
  ) {
    const result = await useCase.execute(input)
    res.json(BaseHttpResponse.success(result))
  }
}

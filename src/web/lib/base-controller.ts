import { Response } from 'express'
import { IUseCase } from 'utils/types'
import { BaseHttpResponse } from './base-http-response'
import { injectable } from 'inversify'
import { BaseHttpController } from 'inversify-express-utils'

@injectable()
export class BaseController extends BaseHttpController {
  protected async executeUseCase<InputDto, OutputDto>(
    useCase: IUseCase<InputDto, OutputDto>,
    input: InputDto,
    res: Response
  ) {
    const result = await useCase.execute(input)
    res.json(BaseHttpResponse.success(result))
  }
}

import { Response } from 'express'
import { injectable } from 'inversify'

import { IUseCase } from 'utils/types'
import { BaseHttpResponse } from './base-http-response'

@injectable()
export class BaseController {
  protected async executeUseCase<InputDto, OutputDto>(
    useCase: IUseCase<InputDto, OutputDto>,
    input: InputDto,
    res: Response
  ) {
    const result = await useCase.execute(input)
    res.json(BaseHttpResponse.success(result))
  }
}

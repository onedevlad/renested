import { Request, Response } from 'express'
import { IUseCase } from 'utils/types'
import { BaseHttpResponse } from './base-http-response'
import { injectable } from 'inversify'

@injectable()
export abstract class BaseController {
  async executeUseCase<InputDto, OutputDto>(
    useCase: IUseCase<InputDto, OutputDto>,
    req: Request<unknown, InputDto>,
    res: Response
  ) {
    const result = await useCase.execute(req.body)
    res.json(BaseHttpResponse.success(result))
  }
}

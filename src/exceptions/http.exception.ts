import { IException } from 'utils/types'

export class HttpException {
  constructor(
    public readonly error: IException,
    public readonly statusCode: number
  ) { }
}

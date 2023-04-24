import { IException } from 'utils/types'

export class HttpException extends Error {
  constructor(
    public readonly error: IException,
    public readonly statusCode: number
  ) { super('HTTP Exception') }
}

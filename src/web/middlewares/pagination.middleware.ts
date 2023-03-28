import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { BaseMiddleware } from 'inversify-express-utils'
import { PaginationData } from 'utils/types'

export type PaginatedResponse = Response<
  unknown,
  { pagination: PaginationData }
>

const MAX_LIMIT = 20

@injectable()
export class PaginationMiddleware extends BaseMiddleware {
  private strToInt = (str: string, fallback: number) =>
    isNaN(+str) ? fallback : +str

  handler(req: Request, res: PaginatedResponse, next: NextFunction) {
    const rawLimit = (req.query.limit ?? '').toString()
    const rawOffset = (req.query.offset ?? '').toString()

    const offset = this.strToInt(rawOffset, 0)

    const limit = Math.max(this.strToInt(rawLimit, MAX_LIMIT), MAX_LIMIT)

    res.locals.pagination = {
      skip: offset,
      take: limit,
    }

    next()
  }
}

import { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from 'inversify-express-utils'

import { PaginationData } from 'utils/types'

export type PaginatedResponse = Response<
  unknown,
  { pagination: PaginationData }
>

export const MAX_LIMIT = 20

export class PaginationMiddleware extends BaseMiddleware {
  private strToInt = (str: string, fallback: number) =>
    !str || isNaN(+str) ? fallback : +str

  private clamp = (min: number, max: number, x: number) =>
    Math.max(min, Math.min(x, max))

  handler(req: Request, res: PaginatedResponse, next: NextFunction) {
    const rawTake = (req.query.take ?? '').toString()
    const rawSkip = (req.query.skip ?? '').toString()

    const skip = this.clamp(0, Infinity, this.strToInt(rawSkip, 0))
    const take = this.clamp(0, MAX_LIMIT, this.strToInt(rawTake, MAX_LIMIT))

    res.locals.pagination = { skip, take }

    next()
  }
}

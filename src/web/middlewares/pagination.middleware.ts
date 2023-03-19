import { NextFunction, Request, Response } from 'express'
import { PaginationData } from 'utils/types'

export type PaginatedResponse = Response<unknown, { pagination: PaginationData }>

const MAX_LIMIT = 20

const strToInt = (str: string, fallback: number) => isNaN(+str) ? fallback : +str

export const PaginationMiddleware = (
  req: Request,
  res: PaginatedResponse,
  next: NextFunction,
) => {
  const offset = strToInt(req.query.offset?.toString(), 0)

  const limit = Math.max(
    strToInt(req.query.limit?.toString(), MAX_LIMIT),
    MAX_LIMIT
  )

  res.locals.pagination = {
    skip: offset,
    take: limit,
  }

  next()
}

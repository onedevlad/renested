import { MockProxy } from "jest-mock-extended"
import { NextFunction, Request } from "express"
import { mock } from "jest-mock-extended"

import { PaginatedResponse, PaginationMiddleware, MAX_LIMIT } from "../pagination.middleware"

interface SetupParams {
  req?: MockProxy<Request>
  res?: MockProxy<PaginatedResponse>
  next?: MockProxy<NextFunction>
}
const setup = ({
  req = mock<Request>(),
  res = mock<PaginatedResponse>(),
  next = jest.fn(),
}: SetupParams = {}) => {
  const handler = new PaginationMiddleware()

  handler.handler(req, res, next)
}

describe('Pagination middleware', () => {
  it("Should handle empty pagination request", () => {
    const res = mock<PaginatedResponse>()

    setup({ res })

    expect(res.locals.pagination.skip).toBe(0)
    expect(res.locals.pagination.take).toBe(MAX_LIMIT)
  })

  it("Should parse invalid pagination request", () => {
    const res = mock<PaginatedResponse>()
    const req = mock<Request>()
    req.query.take = 'lol'
    req.query.skip = 'nope'

    setup({ req, res })

    expect(res.locals.pagination.take).toBe(MAX_LIMIT)
    expect(res.locals.pagination.skip).toBe(0)
  })

  it("Should parse valid pagination request", () => {
    const res = mock<PaginatedResponse>()
    const req = mock<Request>()
    req.query.take = '10'
    req.query.skip = '100'

    setup({ req, res })

    expect(res.locals.pagination.take).toBe(10)
    expect(res.locals.pagination.skip).toBe(100)
  })

  it("Should keep pagination within bounds", () => {
    const res = mock<PaginatedResponse>()
    const req = mock<Request>()
    req.query.skip = '-1000'
    req.query.take = '10000'

    setup({ req, res })

    expect(res.locals.pagination.take).toBe(MAX_LIMIT)
    expect(res.locals.pagination.skip).toBe(0)
  })
})

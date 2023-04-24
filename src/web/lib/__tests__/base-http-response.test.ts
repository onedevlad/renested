import { BaseHttpResponse } from 'web/lib/base-http-response'
describe('Base HTTP response', () => {
  it('Can wrap a response', () => {
    const data = {}
    const error = null
    const statusCode = 200
    const res = new BaseHttpResponse(data, error, statusCode)

    expect(res.data).toBe(data)
    expect(res.errors).not.toBeDefined()
    expect(res.statusCode).toBe(statusCode)
  })

  it('Can wrap error response', () => {
    const data = null
    const errors = ['Something went wrong']
    const statusCode = 500
    const res = new BaseHttpResponse(data, errors, statusCode)

    expect(res.data).toEqual(data)
    expect(res.errors).toEqual(errors)
    expect(res.statusCode).toEqual(statusCode)
  })

  it('Provides sensible defaults for success', () => {
    const data = {}
    const res = BaseHttpResponse.success(data)

    expect(res.data).toEqual(data)
    expect(res.errors).not.toBeDefined()
    expect(res.statusCode).toBe(200)
  })

  it('Provides sensible defaults for errors', () => {
    const errors = ['Something went wrong']
    const res = BaseHttpResponse.error(errors)

    expect(res.data).toEqual(null)
    expect(res.errors).toBe(errors)
    expect(res.statusCode).toBe(400)
  })
})

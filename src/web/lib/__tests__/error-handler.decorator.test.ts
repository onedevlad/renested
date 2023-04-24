import { handleErrors } from "web/lib/decorators/error-handler.decorator"
import { IException } from "utils/types"
import { HttpException } from "exceptions/http.exception"

class Exception extends Error implements IException {
  constructor(msg?: string) { super(msg) }
}

class Testing {
  @handleErrors([])
  static async success() {
    return null
  }

  @handleErrors([])
  static async unknownException() {
    throw new Exception()
  }

  @handleErrors([[Exception, 422]])
  static async knownException() {
    throw new Exception()
  }
}

describe('Error handler decorator', () => {
  it('Should decorate a function without throwing', () => {
    expect(Testing.success()).resolves.toBe(null)
  })

  it('Should re-throw unknown exceptions', () => {
    expect(Testing.unknownException).rejects.toBeInstanceOf(Exception)
  })

  it('Should wrap known exceptions', () => {
    expect(Testing.knownException).rejects.toBeInstanceOf(HttpException)
    expect(Testing.knownException).rejects.toHaveProperty('statusCode', 422)
    expect(Testing.knownException).rejects.toHaveProperty('error', expect.any(Exception))
  })
})

export class BaseHttpResponse {
  constructor(
    public readonly data: unknown = {},
    public readonly errors: string[] | null = null,
    public readonly statusCode: number
  ) {}

  static success(data: unknown, statusCode = 200) {
    return new BaseHttpResponse(data, null, statusCode)
  }

  static error(msgs: string | string[], statusCode = 400) {
    const messages = Array.isArray(msgs) ? msgs : [msgs]
    return new BaseHttpResponse(null, messages, statusCode)
  }
}

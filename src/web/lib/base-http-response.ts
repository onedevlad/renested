export class BaseHttpResponse {
  constructor(
    public readonly data: any = {},
    public readonly error: string | null = null,
    public readonly statusCode: number
  ) {}

  static success(data: any, statusCode = 200) {
    return new BaseHttpResponse(data, null, statusCode)
  }

  static error(msg: string, statusCode = 400) {
    return new BaseHttpResponse(null, msg, statusCode)
  }
}

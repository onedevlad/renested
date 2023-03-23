export interface PaginationData {
  skip: number
  take: number
}

export interface IUseCase<TRequest, TResponse> {
  execute(req: TRequest): Promise<TResponse>
}

export interface IException extends Error {
  errors?: string[]
}

export type Class<T = object> = new (...args: unknown[]) => T

export type UserId = number

export interface TokenPayload {
  id: UserId
  email: string
}

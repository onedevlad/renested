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

export interface TokenPayload {
  id: string
  email: string
}

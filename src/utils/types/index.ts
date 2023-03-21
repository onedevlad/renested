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

export type Class<T = unknown> = new (...args: unknown[]) => T

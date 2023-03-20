export interface PaginationData {
  skip: number
  take: number
}

export interface IUseCase<TRequest, TResponse> {
  execute(req: TRequest): Promise<TResponse>
}

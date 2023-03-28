import { mock } from 'jest-mock-extended'
import { ObjectLiteral, Repository } from 'typeorm'
import { AppDataSource } from 'web/persistance/dataSource'

export const makeMockDataSource = <R extends Repository<ObjectLiteral>>(
  repository?: R
) => {
  const dataSource = mock<AppDataSource>()

  if (repository) dataSource.getRepository.mockReturnValue(repository)

  return dataSource
}

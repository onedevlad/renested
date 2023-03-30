import { mock } from 'jest-mock-extended'
import { ObjectLiteral, Repository } from 'typeorm'

import { DataSource } from 'web/persistance/data-source'

export const makeMockDataSource = <R extends Repository<ObjectLiteral>>(
  repository?: R
) => {
  const dataSource = mock<DataSource>()

  if (repository) dataSource.getRepository.mockReturnValue(repository)

  return dataSource
}

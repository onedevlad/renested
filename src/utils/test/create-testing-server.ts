import { Container } from 'inversify'

import { sharedModules } from 'config/shared-modules'
import { DataSource } from 'web/persistance/data-source'
import { setupServer } from 'web/setupServer'
import { Logger } from 'services/logger'
import { mock } from 'jest-mock-extended'
import { makeMockDataSource } from './mockDataSource'

export const createTestingServer = (
  container: Container,
  dataSource: DataSource = makeMockDataSource()
) => {
  sharedModules.forEach(m => container.bind(m).toSelf())
  container.rebind(DataSource).toConstantValue(dataSource)

  const logger = mock<Logger>()
  const app = setupServer({ container, logger })

  return app
}

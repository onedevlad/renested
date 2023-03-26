import { Container } from 'inversify'

import { sharedModules } from 'config/shared-modules'
import { AppDataSource } from 'web/persistance/dataSource'
import { setupServer } from 'web/setupServer'
import { Logger } from 'services/logger'
import { mock } from 'jest-mock-extended'

export const createTestingServer = (container: Container, dataSource: AppDataSource) => {
  sharedModules.forEach((m) => container.bind(m).toSelf())
  container.rebind(AppDataSource).toConstantValue(dataSource)

  const logger = mock<Logger>().logger
  const app = setupServer({ container, logger })

  return app
}

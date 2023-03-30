import { Container, ContainerModule } from 'inversify'

import { Class } from 'utils/types'

export const createTestingModule = (...modules: Class<ContainerModule>[]) => {
  const container = new Container()

  container.load(...modules.map(m => new m()))

  return container
}

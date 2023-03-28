import express, { Application as ExpressApp } from 'express'

import type { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'

import { ErrorHandlerMiddleware } from './middlewares/error-handler.middleware'
import { Logger } from 'services/logger'

import { AuthProvider } from './lib/auth-provider'
import { initRequestContext } from './lib/request-context'

interface SetupServerParams {
  container: Container
  logger: Logger['logger']
  setErrorConfig?: (app: ExpressApp) => void
  setConfig?: (app: ExpressApp) => void
}

const noop = () => null

export const setupServer = ({
  container,
  logger,
  setErrorConfig = noop,
  setConfig = noop,
}: SetupServerParams) => {
  const server = new InversifyExpressServer(
    container,
    null,
    null,
    null,
    AuthProvider
  )

  const errorHandlerMiddleware = new ErrorHandlerMiddleware(logger)

  server.setErrorConfig((app) => {
    app.use(errorHandlerMiddleware.execute)
    setErrorConfig(app)
    return app
  })

  server.setConfig((app) => {
    app.use(express.json())
    app.use(initRequestContext({}))
    setConfig(app)
    return app
  })

  return server.build()
}

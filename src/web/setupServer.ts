import express, { Application as ExpressApp } from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'

import { ErrorHandlerMiddleware } from 'web/middlewares/error-handler.middleware'
import { Logger } from 'services/logger'
import { AuthProvider } from 'web/lib/auth-provider'
import { initRequestContext } from 'web/lib/request-context'

interface SetupServerParams {
  container: Container
  logger: Logger
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

  server.setErrorConfig(app => {
    app.use(errorHandlerMiddleware.execute)
    setErrorConfig(app)
    return app
  })

  server.setConfig(app => {
    app.use(express.json())
    app.use(initRequestContext({}))
    setConfig(app)
    return app
  })

  return server.build()
}

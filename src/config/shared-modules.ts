import { interfaces } from 'inversify'

import { Logger } from 'services/logger'
import { DataSource } from 'web/persistance/data-source'
import { TokenService } from 'services/token/token.service'
import { PasswordService } from 'services/password/password.service'

import { AuthMiddleware } from 'web/middlewares/auth.middleware'
import { PaginationMiddleware } from 'web/middlewares/pagination.middleware'

export const sharedModules: interfaces.ServiceIdentifier[] = [
  Logger,
  DataSource,
  AuthMiddleware,
  PaginationMiddleware,
  TokenService,
  PasswordService,
]

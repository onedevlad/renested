import { interfaces } from 'inversify'

import { Logger } from 'services/logger'
import { AppDataSource } from 'web/persistance/dataSource'
import { TokenService } from 'services/token/token.service'
import { PasswordService } from 'services/password/password.service'

import { AuthMiddleware } from 'web/middlewares/auth.middleware'
import { PaginationMiddleware } from 'web/middlewares/pagination.middleware'

export const sharedModules: interfaces.ServiceIdentifier[] = [
  Logger,
  AppDataSource,
  AuthMiddleware,
  PaginationMiddleware,
  TokenService,
  PasswordService,
]

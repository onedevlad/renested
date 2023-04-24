import { Request, Response, NextFunction } from 'express'

import { Principal } from './auth-principal'

declare global {
  namespace Express {
    export interface Request {
      context: {
        user?: Principal
      }
    }
  }
}

export const initRequestContext =
  (initialContext: Request['context']) =>
    (req: Request, _res: Response, next: NextFunction) => {
      req.context = initialContext
      next()
    }

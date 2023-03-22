import { Request, Response, NextFunction } from 'express'
import { TokenPayload } from 'utils/types'

declare global {
  namespace Express {
    export interface Request {
      context: {
        tokenData?: TokenPayload
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

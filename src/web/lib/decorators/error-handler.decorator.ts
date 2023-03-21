import { HttpException } from 'exceptions/http.exception'
import { Class, IException } from 'utils/types'

type ErrorMap = [Class<IException>, number][]

export const handleErrors =
  (errorMap: ErrorMap): MethodDecorator =>
    (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value

      descriptor.value = async function(...args: unknown[]) {
        try {
          return await originalMethod.apply(this, args)
        } catch (caughtError) {
          if (!errorMap) throw caughtError

          for (const [err, code] of errorMap) {
            if (caughtError instanceof err) throw new HttpException(caughtError, code)
          }

          throw caughtError
        }
      }
    }

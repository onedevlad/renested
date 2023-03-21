import { IException } from "utils/types"

export class UserAlreadyExistsException extends Error implements IException {
  constructor() {
    super('User already exists')
    Object.setPrototypeOf(this, UserAlreadyExistsException.prototype)
  }
}

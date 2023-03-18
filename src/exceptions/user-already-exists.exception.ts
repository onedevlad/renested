export class UserAlreadyExistsException extends Error {
  constructor() {
    super('User already exists')
    Object.setPrototypeOf(this, UserAlreadyExistsException.prototype)
  }
}

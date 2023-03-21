import { IException } from "utils/types"

export class InvalidCredentialsException extends Error implements IException {
  constructor() {
    super("Invalid credentials provided")
  }
}

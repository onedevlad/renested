import { IException } from "utils/types"

export class UnauthorizedException extends Error implements IException {
  constructor() {
    super("Unauthorized")
  }
}

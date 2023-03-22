import { interfaces } from 'inversify-express-utils'
import { TokenPayload } from 'utils/types'

export class Principal implements interfaces.Principal {
  public details: TokenPayload | null

  public constructor(details: TokenPayload | null) {
    this.details = details
  }
  public async isAuthenticated(): Promise<boolean> {
    return !!this.details?.id
  }

  public async isResourceOwner() { return false }
  public async isInRole() { return false }
}

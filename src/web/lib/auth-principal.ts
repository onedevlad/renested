import { UnauthorizedException } from 'exceptions/unauthorized.exception'
import { TokenPayload } from 'utils/types'

export class Principal {
  private details: TokenPayload | null

  public constructor(details: TokenPayload | null) {
    this.details = details
  }

  public isAuthenticated(): boolean {
    return !!this.details?.id
  }

  public getUserId = () => {
    if (!this.details) throw new UnauthorizedException()
    return this.details.id
  }
}

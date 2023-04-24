import { UnauthorizedException } from "exceptions/unauthorized.exception"
import { TokenPayload } from "utils/types"
import { Principal } from "web/lib/auth-principal"

describe('Auth Principal', () => {
  it('Can be empty', async () => {
    const principal = new Principal(null)

    expect(principal.getUserId).toThrow(UnauthorizedException)
  })

  it('Can contain token payload', async () => {
    const payload: TokenPayload = { id: 123, email: 'jdoe@email.com' }
    const principal = new Principal(payload)

    expect(principal.getUserId()).toBe(payload.id)
    expect(principal.isAuthenticated()).toBe(true)
  })
})

import { UnauthorizedException } from "exceptions/unauthorized.exception"
import { TokenPayload } from "utils/types"
import { Principal } from "web/lib/auth-principal"

describe('Auth Principal', () => {
  it('Can be empty', async () => {
    const principal = new Principal(null)

    expect(await principal.isAuthenticated()).toBe(false)
    expect(principal.getUserId).toThrow(UnauthorizedException)
  })

  it('Stubs useless methods', async () => {
    const principal = new Principal(null)

    expect(await principal.isResourceOwner()).toBe(false)
    expect(await principal.isInRole()).toBe(false)
  })

  it('Can contain token payload', async () => {
    const payload: TokenPayload = { id: 123, email: 'jdoe@email.com' }
    const principal = new Principal(payload)

    expect(principal.getUserId()).toBe(payload.id)
    expect(await principal.isAuthenticated()).toBe(true)
  })
})

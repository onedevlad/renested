import { UserEntity } from 'modules/user/user.entity'
import { TokenService } from './token.service'

const setup = () => {
  const tokenService = new TokenService()
  return { tokenService }
}

describe('TokenService', () => {
  it('Should create & parse token', async () => {
    const { tokenService } = setup()
    const tokenData = { id: 123, email: 'jdoe@email.com' }
    const user = Object.assign(new UserEntity(), tokenData)

    const token = tokenService.createToken(user)

    expect(tokenService.validateToken(token)).toEqual(tokenData)
  })
})

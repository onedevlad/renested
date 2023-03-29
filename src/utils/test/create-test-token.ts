import { UserEntity } from 'modules/user/user.entity'
import { TokenService } from 'services/token/token.service'
import { TokenPayload } from 'utils/types'

const tokenService = new TokenService()

export const createTestToken = (tokenData?: TokenPayload) => {
  const user = new UserEntity()

  user.id = tokenData?.id || 123
  user.email = tokenData?.email || 'jdoe@email.com'

  return tokenService.createToken(user)
}

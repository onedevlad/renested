import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import { User as UserEntity } from 'modules/user/user.entity'
import { TokenPayload } from 'utils/types'

@injectable()
export class TokenService {
  createToken(user: UserEntity) {
    const token = jwt.sign(
      { data: { id: user.id, email: user.email } },
      process.env.JWT_SECRET ?? '',
      { expiresIn: '1y' }
    )

    return token
  }

  parseToken(token: string) {
    const decoded = jwt.decode(token)

    if (!decoded || typeof decoded === 'string') return null

    return decoded.data as TokenPayload
  }
}

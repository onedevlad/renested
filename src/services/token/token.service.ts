import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'

import { UserEntity } from 'modules/user/user.entity'
import { TokenPayload } from 'utils/types'

const SECRET = process.env.JWT_SECRET ?? ''
const signOptions = { expiresIn: '1y' }

@injectable()
export class TokenService {
  createToken(user: UserEntity) {
    const data = { id: user.id, email: user.email }
    const token = jwt.sign(
      { data },
      SECRET,
      signOptions
    )

    return token
  }

  validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, SECRET)

      if (!decoded || typeof decoded === 'string') return null

      return decoded.data as TokenPayload
    } catch(e) {
      return null
    }
  }
}

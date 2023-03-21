import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import { UserEntity } from 'modules/user'

@injectable()
export class TokenService {
  createToken(user: UserEntity) {
    const token = jwt.sign(
      { data: { id: user.id, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    )

    return token
  }
}

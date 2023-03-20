import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import { User } from 'repositories/entities/user.entity'

@injectable()
export class TokenService {
  createToken(user: User) {
    const token = jwt.sign(
      { data: { id: user.id, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    )

    return token
  }
}

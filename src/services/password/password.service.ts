import { injectable } from 'inversify'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 8

@injectable()
export class PasswordService {
  async hash(password: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    return bcrypt.hash(password, salt)
  }

  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }
}

import jwt from "jsonwebtoken"
import { JwtManager } from "@src/application/auth/interfaces"
import { User } from "@src/domain/user/entities"

export class JwtManagerImpl implements JwtManager {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: number = 3600,  // default value is 1 hour
  ) {}

  generateToken(user: User): string {
    const payload = { id: user.id, address: user.address }
    return jwt.sign(payload, this.secret, { algorithm: "HS256", expiresIn: this.expiresIn })
  }
}

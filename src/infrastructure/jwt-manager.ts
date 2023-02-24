import { JwtManager } from "@src/application/auth/interfaces"
import { User } from "@src/domain/user/entities"
import jwt from "jsonwebtoken"

export class JwtManagerImpl implements JwtManager {
  constructor(
    private readonly privateKey: string,
    private readonly expiresIn: number = 3600,  // default value is 1 hour
  ) { }

  generateToken(user: User): string {
    const payload = { id: user.id, address: user.address }
    return jwt.sign(payload, this.privateKey, { algorithm: "HS256", expiresIn: this.expiresIn })
  }
}

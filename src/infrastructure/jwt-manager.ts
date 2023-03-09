import { UserPayload } from "@src/application/auth/dto"
import { InvalidJwtToken, JwtTokenIsExpired, UnknownJwtTokenError } from "@src/application/auth/exceptions"
import { JwtManager } from "@src/application/auth/interfaces"
import jwt from "jsonwebtoken"

export class JwtManagerImpl implements JwtManager {
  constructor(
    private readonly privateKey: string,
    private readonly expiresIn: number = 3600,  // default value is 1 hour
  ) { }

  generateToken(userPayload: UserPayload): string {
    return jwt.sign(userPayload, this.privateKey, { algorithm: "HS256", expiresIn: this.expiresIn })
  }

  validateToken(token: string): UserPayload {
    try {
      const decoded = jwt.verify(token, this.privateKey, { algorithms: ["HS256"], complete: false })

      // Token is valid
      console.log("Token is valid")
      console.log(decoded) // This is the decoded payload of the token

      return decoded as UserPayload
    } catch (err: any) {
      // Handle verification errors
      if (err instanceof jwt.TokenExpiredError) {
        throw new JwtTokenIsExpired(err)
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new InvalidJwtToken(err)
      } else {
        throw new UnknownJwtTokenError(err)
      }
    }
  }
}

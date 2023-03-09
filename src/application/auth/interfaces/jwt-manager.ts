import { UserPayload } from "@src/application/auth/dto"


export interface JwtManager {
  generateToken(userPayload: UserPayload): string
  validateToken(token: string): UserPayload
}

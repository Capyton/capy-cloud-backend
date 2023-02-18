import { User } from "@src/domain/user/entities";


export interface JwtManager {
  generateToken(user: User): string
}

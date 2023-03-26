import { RefreshToken } from "@src/domain/refresh-token/entities"
import { UserPayload } from "@src/application/auth/dto"

export interface JwtManager {
    generateAccessToken(userPayload: UserPayload): string
    generateRefreshToken(userPayload: UserPayload): RefreshToken
    validateToken(token: string): UserPayload
}

import { InvalidJwtToken, JwtTokenIsExpired, UnknownJwtTokenError } from "@src/application/auth/exceptions"

import { JwtManager } from "@src/application/auth/interfaces"
import { RefreshToken } from "@src/domain/auth-session/value_objects"
import { UserPayload } from "@src/application/auth/dto"
import jwt from "jsonwebtoken"

export class JwtManagerImpl implements JwtManager {
    constructor(
        private readonly privateKey: string,
        private readonly accessTokenExpiresIn: number = 3600,  // default value is 1 hour
        private readonly refreshTokenExpiresIn: number = 7776000,  // default value is 90 days
    ) { }

    generateAccessToken(userPayload: UserPayload): string {
        const payload = {...userPayload}
        return jwt.sign(payload, this.privateKey, { algorithm: "HS256", expiresIn: this.accessTokenExpiresIn })
    }

    generateRefreshToken(userPayload: UserPayload): RefreshToken {
        const issuedAt = Math.floor(Date.now() / 1000)
        const expiresAt = issuedAt + this.refreshTokenExpiresIn
        const payload = { iat: issuedAt, exp: expiresAt, ...userPayload }
        const refreshToken = jwt.sign(payload, this.privateKey, { algorithm: "HS256" })
        return new RefreshToken(refreshToken, new Date(expiresAt * 1000))
    }

    validateToken(token: string): UserPayload {
        try {
            const decoded = jwt.verify(token, this.privateKey, { algorithms: ["HS256"], complete: false })

            console.log("Token is valid")
            console.log(decoded) // This is the decoded payload of the token

            return decoded as UserPayload
        } catch (err) {
            // Handle verification errors
            if (err instanceof jwt.TokenExpiredError) {
                throw new JwtTokenIsExpired(err)
            } else if (err instanceof jwt.JsonWebTokenError) {
                throw new InvalidJwtToken(err)
            } else {
                console.error("Unknown error while validating token: ", err)

                throw new UnknownJwtTokenError()
            }
        }
    }
}

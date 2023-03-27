import { RefreshToken } from "./value_objects"
import { UUID } from "@src/utils/uuid"


export class AuthSession {
    constructor(
        public readonly id: UUID,
        public readonly userId: UUID,
        public refreshToken: RefreshToken,
    ) { }

    static create(
        id: UUID,
        userId: UUID,
        refreshToken: RefreshToken,
    ): AuthSession {
        return new AuthSession(id, userId, refreshToken)
    }

    refresh(refreshToken: RefreshToken): void {
        if (this.refreshToken.isExpired()) {
            throw new Error("Auth session is expired")
        }
        this.refreshToken = refreshToken
    }
}

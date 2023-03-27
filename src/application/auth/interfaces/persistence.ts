import { AuthSession } from "@src/domain/auth-session/entities"
import { TonAddress } from "@src/domain/user/types"
import { UUID } from "@src/utils/uuid"
import { User } from "@src/domain/user/entities"


export interface UserRepo {
    getUserByAddress(address: TonAddress): Promise<User>
    getUserById(id: UUID): Promise<User>
    addUser(user: User): Promise<void>
}

export interface AuthSessionRepo {
    acquireAuthSessionByRefreshToken(refreshToken: string): Promise<AuthSession>
    addAuthSession(authSession: AuthSession): Promise<void>
    updateAuthSession(authSession: AuthSession): Promise<void>
}

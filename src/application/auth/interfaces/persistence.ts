import { RefreshToken } from "@src/domain/refresh-token/entities"
import { TonAddress } from "@src/domain/user/types"
import { User } from "@src/domain/user/entities"

export interface UserRepo {
    getUserByAddress(address: TonAddress): Promise<User>
    addUser(user: User): Promise<void>
}

export interface RefreshTokenRepo {
    addRefreshToken(refreshToken: RefreshToken): Promise<void>
}

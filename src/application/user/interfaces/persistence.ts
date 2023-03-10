import { User as UserDTO } from "@src/application/user/dto"
import { User } from "@src/domain/user/entities"
import { TonAddress } from "@src/domain/user/types"
import { UUID } from "@src/utils/uuid"


export interface UserRepo {
    getUserById(id: UUID): Promise<User>
    addUser(user: User): Promise<void>
    deleteUserById(id: UUID): Promise<void>
    deleteUserByAddress(address: TonAddress): Promise<void>
}

export interface UserReader {
    getUserById(id: UUID): Promise<UserDTO>
    getUserByAddress(address: TonAddress): Promise<UserDTO>
}

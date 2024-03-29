import { UUID } from "@src/utils/uuid"
import { UserBag } from "@src/domain/user_bag/entities"
import { UserBag as UserBagDTO } from "@src/application/user_bag/dto/user-bag"

export interface UserBagRepo {
    addUserBag(userBag: UserBag): Promise<void>
    deleteUserBagById(id: UUID): Promise<void>
    deleteUserBagsByUserId(userId: UUID): Promise<void>
}

export interface UserBagReader {
    getUserBagById(id: UUID): Promise<UserBagDTO>
    getUserBagsByUserId(userId: UUID): Promise<UserBagDTO[]>
}

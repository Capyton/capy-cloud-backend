import { UUID } from "@src/utils/uuid"
import { UserBag } from "@src/application/user_bag/dto/user-bag"
import { UserBagReader } from "@src/application/user_bag/interfaces/persistence"

export class GetUserBagsByUserId {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetUserBagsByUserIdHandler {
    constructor(
        readonly userBagReader: UserBagReader,
    ) { }

    execute(command: GetUserBagsByUserId): Promise<UserBag[]> {
        return this.userBagReader.getUserBagsByUserId(command.id)
    }
}

import { UserBag } from "@src/application/user_bag/dto/user-bag"
import { UserBagReader } from "@src/application/user_bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class GetUserBagsByUserId {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetUserBagsByUserIdHandler {
    constructor(
        readonly userBagReader: UserBagReader,
    ) { }

    async execute(command: GetUserBagsByUserId): Promise<UserBag[]> {
        return await this.userBagReader.getUserBagsByUserId(command.id)
    }
}

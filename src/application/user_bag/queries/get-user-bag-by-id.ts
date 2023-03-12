import { UUID } from "@src/utils/uuid"
import { UserBag } from "@src/application/user_bag/dto/user-bag"
import { UserBagReader } from "@src/application/user_bag/interfaces/persistence"

export class GetUserBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetUserBagByIdHandler {
    constructor(
        readonly userBagReader: UserBagReader,
    ) { }

    execute(command: GetUserBagById): Promise<UserBag> {
        return this.userBagReader.getUserBagById(command.id)
    }
}

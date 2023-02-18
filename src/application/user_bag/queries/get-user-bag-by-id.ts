import { UserBag } from "@src/application/user_bag/dto/user-bag"
import { UserBagReader } from "@src/application/user_bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class GetUserBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetUserBagByIdHandler {
    constructor(
        readonly userBagReader: UserBagReader,
    ) { }

    async execute(command: GetUserBagById): Promise<UserBag> {
        return await this.userBagReader.getUserBagById(command.id)
    }
}

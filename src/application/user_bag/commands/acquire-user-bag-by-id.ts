import { UserBagRepo } from "@src/application/user_bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { UserBag } from "@src/domain/user_bag/entities"

export class AcquireUserBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class AcquireUserBagByIdHandler {
    constructor(
        readonly userBagRepo: UserBagRepo,
    ) { }

    async execute(command: AcquireUserBagById): Promise<UserBag> {
        return await this.userBagRepo.acquireUserBagById(command.id)
    }
}

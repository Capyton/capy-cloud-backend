import { UserBagRepo } from "@src/application/user_bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class DeleteUserBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteUserBagByIdHandler {
    constructor(
        readonly userBagRepo: UserBagRepo,
    ) { }

    async execute(command: DeleteUserBagById): Promise<void> {
        await this.userBagRepo.deleteUserBagById(command.id)
    }
}

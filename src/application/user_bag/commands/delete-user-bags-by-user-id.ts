import { UserBagRepo } from "@src/application/user_bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class DeleteUserBagsByUserId {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteUserBagsByUserIdHandler {
    constructor(
        readonly userBagRepo: UserBagRepo,
    ) { }

    async execute(command: DeleteUserBagsByUserId): Promise<void> {
        await this.userBagRepo.deleteUserBagsByUserId(command.id)
    }
}

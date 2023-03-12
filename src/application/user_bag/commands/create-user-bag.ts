import { UUID } from "@src/utils/uuid"
import { UnitOfWork } from "@src/application/common/interfaces"
import { UserBag } from "@src/domain/user_bag/entities"
import { UserBagRepo } from "@src/application/user_bag/interfaces/persistence"

export class CreateUserBag {
    constructor(
        readonly id: UUID,
        readonly userId: UUID,
        readonly bagId: UUID,
    ) { }
}

export class CreateUserBagHandler {
    constructor(
        readonly userBagRepo: UserBagRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: CreateUserBag): Promise<void> {
        const userBag = UserBag.create(
            command.id, command.userId, command.bagId,
        )
        await this.userBagRepo.addUserBag(userBag)
        await this.uow.commit()
    }
}

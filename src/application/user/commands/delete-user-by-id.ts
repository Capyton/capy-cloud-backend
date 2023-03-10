import { UnitOfWork } from "@src/application/common/interfaces"
import { UserRepo } from "@src/application/user/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class DeleteUserById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteUserByIdHandler {
    constructor(
        readonly userRepo: UserRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: DeleteUserById): Promise<void> {
        await this.userRepo.deleteUserById(command.id)
        await this.uow.commit()
    }
}

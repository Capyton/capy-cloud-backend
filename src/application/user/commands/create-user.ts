import { UnitOfWork } from "@src/application/common/interfaces"
import { UserRepo } from "@src/application/user/interfaces/persistence"
import { User } from "@src/domain/user/entities"
import { TonAddress } from "@src/domain/user/types"
import { UUID } from "@src/utils/uuid"

export class CreateUser {
    constructor(
        readonly id: UUID,
        readonly address: TonAddress,
    ) { }
}

export class CreateUserHandler {
    constructor(
        readonly userRepo: UserRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: CreateUser): Promise<void> {
        const user = User.create(command.id, command.address)
        await this.userRepo.addUser(user)
        await this.uow.commit()
    }
}

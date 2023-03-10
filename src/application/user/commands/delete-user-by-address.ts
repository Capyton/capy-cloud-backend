import { UnitOfWork } from "@src/application/common/interfaces"
import { UserRepo } from "@src/application/user/interfaces/persistence"
import { TonAddress } from "@src/domain/user/types"

export class DeleteUserByAddress {
    constructor(
        readonly address: TonAddress
    ) { }
}

export class DeleteUserByAddressHandler {
    constructor(
        readonly userRepo: UserRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: DeleteUserByAddress): Promise<void> {
        await this.userRepo.deleteUserByAddress(command.address)
        await this.uow.commit()
    }
}

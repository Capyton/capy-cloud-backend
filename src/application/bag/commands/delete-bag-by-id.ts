import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { UnitOfWork } from "@src/application/common/interfaces"
import { UUID } from "@src/utils/uuid"

export class DeleteBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteBagByIdHandler {
    constructor(
        readonly bagRepo: BagRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: DeleteBagById): Promise<void> {
        await this.bagRepo.deleteBagById(command.id)
        await this.uow.commit()
    }
}

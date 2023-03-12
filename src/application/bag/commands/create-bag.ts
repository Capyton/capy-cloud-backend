import { Bag } from "@src/domain/bag/entities"
import { BagId } from "@src/domain/bag/types"
import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"
import { UnitOfWork } from "@src/application/common/interfaces"

export class CreateBag {
    constructor(
        readonly id: UUID,
        readonly bagId: BagId,
        readonly description: string | null,
        readonly size: number,
        readonly isUploaded: boolean,
    ) { }
}

export class CreateBagHandler {
    constructor(
        readonly bagRepo: BagRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: CreateBag): Promise<void> {
        const bag = Bag.create(
            command.id, command.bagId, command.description,
            command.size, command.isUploaded,
        )
        await this.bagRepo.addBag(bag)
        await this.uow.commit()
    }
}

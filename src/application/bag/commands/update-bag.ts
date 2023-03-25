import { Bag } from "@src/domain/bag/entities"
import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"
import { UnitOfWork } from "@src/application/common/interfaces"

export class UpdateBagData {
    constructor(
        readonly isUploaded: boolean | undefined = undefined,
    ) { }
}

export class UpdateBag {
    constructor(
        readonly id: UUID,
        readonly bagData: UpdateBagData,
    ) { }
}

export class UpdateBagHandler {
    constructor(
        readonly bagRepo: BagRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: UpdateBag): Promise<void> {
        const bag = await this.bagRepo.getBagById(command.id)

        await this.bagRepo.updateBad(new Bag(
            bag.id,
            bag.bagId,
            bag.description,
            bag.size,
            (command.bagData.isUploaded != null) ? command.bagData.isUploaded : bag.isUploaded,
            bag.createdAt,
        ))
        await this.uow.commit()
    }
}

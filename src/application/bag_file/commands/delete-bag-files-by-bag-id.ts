import { BagFileRepo } from "@src/application/bag_file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"


export class DeleteBagFilesByBagId {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteBagFilesByBagIdHandler {
    constructor(
        readonly bagFileRepo: BagFileRepo,
    ) { }

    async execute(command: DeleteBagFilesByBagId): Promise<void> {
        await this.bagFileRepo.deleteBagFilesByBagId(command.id)
    }
}

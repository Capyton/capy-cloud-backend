import { BagFileRepo } from "@src/application/bag_file/interfaces/persistence"
import { BagId } from "@src/domain/bag/types"


export class DeleteBagFilesByBagId {
    constructor(
        readonly id: BagId,
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

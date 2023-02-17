import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class DeleteBag {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteBagHandler {
    constructor(
        readonly bagRepo: BagRepo,
    ) { }

    async execute(command: DeleteBag): Promise<void> {
        await this.bagRepo.deleteBagById(command.id)
    }
}

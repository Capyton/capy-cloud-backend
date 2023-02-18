import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class DeleteBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteBagByIdHandler {
    constructor(
        readonly bagRepo: BagRepo,
    ) { }

    async execute(command: DeleteBagById): Promise<void> {
        await this.bagRepo.deleteBagById(command.id)
    }
}

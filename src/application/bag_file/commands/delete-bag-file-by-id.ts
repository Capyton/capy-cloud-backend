import { BagFileRepo } from "@src/application/bag_file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class DeleteBagFileById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteBagFileByIdHandler {
    constructor(
        readonly bagFileRepo: BagFileRepo,
    ) { }

    async execute(command: DeleteBagFileById): Promise<void> {
        await this.bagFileRepo.deleteBagFileById(command.id)
    }
}

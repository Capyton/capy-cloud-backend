import { BagFileRepo } from "@src/application/bag_file/interfaces/persistence"
import { BagFile } from "@src/domain/bag_file/entities"
import { UUID } from "@src/domain/common/types"

export class AcquireBagFileById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class AcquireBagFileByIdHandler {
    constructor(
        readonly bagfileRepo: BagFileRepo,
    ) { }

    async execute(command: AcquireBagFileById): Promise<BagFile> {
        return await this.bagfileRepo.acquireBagFileById(command.id)
    }
}

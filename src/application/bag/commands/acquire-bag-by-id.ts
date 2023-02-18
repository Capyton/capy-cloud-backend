import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { Bag } from "@src/domain/bag/entities"
import { UUID } from "@src/domain/common/types"

export class AcquireBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class AcquireBagByIdHandler {
    constructor(
        readonly bagRepo: BagRepo,
    ) { }

    async execute(command: AcquireBagById): Promise<Bag> {
        return await this.bagRepo.acquireBagById(command.id)
    }
}

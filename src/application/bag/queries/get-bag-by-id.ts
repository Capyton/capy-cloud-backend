import { Bag } from "@src/application/bag/dto/bag"
import { BagRepoReader } from "@src/application/bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class GetBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetBagByIdHandler {
    constructor(
        readonly bagReader: BagRepoReader,
    ) { }

    async execute(command: GetBagById): Promise<Bag> {
        return await this.bagReader.getBagById(command.id)
    }
}

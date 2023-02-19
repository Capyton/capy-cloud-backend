import { Bag } from "@src/application/bag/dto/bag"
import { BagReader } from "@src/application/bag/interfaces/persistence"
import { BagId } from "@src/domain/bag/types"

export class GetBagByBagId {
    constructor(
        readonly id: BagId,
    ) { }
}

export class GetBagByBagIdHandler {
    constructor(
        readonly bagReader: BagReader,
    ) { }

    async execute(command: GetBagByBagId): Promise<Bag> {
        return await this.bagReader.getBagByBagId(command.id)
    }
}

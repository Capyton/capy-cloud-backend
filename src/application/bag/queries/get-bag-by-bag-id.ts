import { Bag } from "@src/application/bag/dto/bag"
import { BagId } from "@src/domain/bag/types"
import { BagReader } from "@src/application/bag/interfaces/persistence"

export class GetBagByBagId {
    constructor(
        readonly id: BagId,
    ) { }
}

export class GetBagByBagIdHandler {
    constructor(
        readonly bagReader: BagReader,
    ) { }

    execute(command: GetBagByBagId): Promise<Bag> {
        return this.bagReader.getBagByBagId(command.id)
    }
}

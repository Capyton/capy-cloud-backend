import { Bag } from "@src/application/bag/dto/bag"
import { BagReader } from "@src/application/bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class GetBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetBagByIdHandler {
    constructor(
        readonly bagReader: BagReader,
    ) { }

    execute(command: GetBagById): Promise<Bag> {
        return this.bagReader.getBagById(command.id)
    }
}

import { BagFile } from "@src/application/bag_file/dto/bag-file"
import { BagFileReader } from "@src/application/bag_file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class GetBagFilesByBagId {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetBagFilesByBagIdHandler {
    constructor(
        readonly bagFileReader: BagFileReader,
    ) { }

    async execute(command: GetBagFilesByBagId): Promise<BagFile[]> {
        return await this.bagFileReader.getBagFilesByBagId(command.id)
    }
}

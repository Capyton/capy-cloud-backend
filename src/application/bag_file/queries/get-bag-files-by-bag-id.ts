import { BagFile } from "@src/application/bag_file/dto/bag-file"
import { BagFileReader } from "@src/application/bag_file/interfaces/persistence"
import { BagId } from "@src/domain/bag/types"

export class GetBagFilesByBagId {
    constructor(
        readonly id: BagId,
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

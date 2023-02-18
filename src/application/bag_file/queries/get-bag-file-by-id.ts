import { BagFile } from "@src/application/bag_file/dto/bag-file"
import { BagFileReader } from "@src/application/bag_file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class GetBagFileById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetBagFileByIdHandler {
    constructor(
        readonly bagFileReader: BagFileReader,
    ) { }

    async execute(command: GetBagFileById): Promise<BagFile> {
        return await this.bagFileReader.getBagFileById(command.id)
    }
}

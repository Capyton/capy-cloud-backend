import { BagId } from "@src/domain/bag/types"
import { File } from "@src/application/file/dto/file"
import { FileReader } from "@src/application/file/interfaces/persistence"

export class GetFilesByBagId {
    constructor(
        readonly bagId: BagId,
    ) { }
}

export class GetFilesByBagIdHandler {
    constructor(
        readonly fileReader: FileReader,
    ) { }

    execute(command: GetFilesByBagId): Promise<File[]> {
        return this.fileReader.getFilesByBagId(command.bagId)
    }
}

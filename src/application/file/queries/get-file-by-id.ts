import { File } from "@src/application/file/dto/file"
import { FileReader } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class GetFileById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetFileByIdHandler {
    constructor(
        readonly fileReader: FileReader,
    ) { }

    async execute(command: GetFileById): Promise<File> {
        return await this.fileReader.getFileById(command.id)
    }
}

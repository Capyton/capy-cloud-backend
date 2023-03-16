import { File } from "@src/application/file/dto/file"
import { FileReader } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class GetFileById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetFileByIdHandler {
    constructor(
        readonly fileReader: FileReader,
    ) { }

    execute(command: GetFileById): Promise<File> {
        return this.fileReader.getFileById(command.id)
    }
}

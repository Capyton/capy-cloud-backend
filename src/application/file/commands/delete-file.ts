import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class DeleteFile {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteFileHandler {
    constructor(
        readonly fileRepo: FileRepo,
    ) { }

    async execute(command: DeleteFile): Promise<void> {
        await this.fileRepo.deleteFileById(command.id)
    }
}

import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class DeleteFileById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteFileByIdHandler {
    constructor(
        readonly fileRepo: FileRepo,
    ) { }

    async execute(command: DeleteFileById): Promise<void> {
        await this.fileRepo.deleteFileById(command.id)
    }
}

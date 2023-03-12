import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/utils/uuid"
import { UnitOfWork } from "@src/application/common/interfaces"

export class DeleteFileById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteFileByIdHandler {
    constructor(
        readonly fileRepo: FileRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: DeleteFileById): Promise<void> {
        await this.fileRepo.deleteFileById(command.id)
        await this.uow.commit()
    }
}

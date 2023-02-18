import { StoragePathRepo } from "@src/application/storage_path/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class DeleteStoragePathById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteStoragePathByIdHandler {
    constructor(
        readonly storagePathRepo: StoragePathRepo,
    ) { }

    async execute(command: DeleteStoragePathById): Promise<void> {
        await this.storagePathRepo.deleteStoragePathById(command.id)
    }
}

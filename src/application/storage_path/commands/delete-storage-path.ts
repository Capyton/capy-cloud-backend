import { StoragePathRepo } from "@src/application/storage_path/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class DeleteStoragePath {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteStoragePathHandler {
    constructor(
        readonly storagePathRepo: StoragePathRepo,
    ) { }

    async execute(command: DeleteStoragePath): Promise<void> {
        await this.storagePathRepo.deleteStoragePathById(command.id)
    }
}

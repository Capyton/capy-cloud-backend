import { StoragePathRepo } from "@src/application/storage_path/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { StoragePath } from "@src/domain/storage_path/entities"

export class AcquireStoragePathById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class AcquireStoragePathByIdHandler {
    constructor(
        readonly storagePathRepo: StoragePathRepo,
    ) { }

    async execute(command: AcquireStoragePathById): Promise<StoragePath> {
        return await this.storagePathRepo.acquireStoragePathById(command.id)
    }
}

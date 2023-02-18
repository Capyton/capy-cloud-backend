import { StoragePath } from "@src/application/storage_path/dto/storage-path"
import { StoragePathReader } from "@src/application/storage_path/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class GetStoragePathById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetStoragePathByIdHandler {
    constructor(
        readonly storagePathReader: StoragePathReader,
    ) { }

    async execute(command: GetStoragePathById): Promise<StoragePath> {
        return await this.storagePathReader.getStoragePathById(command.id)
    }
}

import { StoragePathRepo } from "@src/application/storage_path/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { StoragePath } from "@src/domain/storage_path/entities"

export class CreateStoragePath {
  constructor(
    readonly id: UUID,
    readonly fileId: UUID,
    readonly path: string,
  ) { }
}

export class CreateStoragePathHandler {
  constructor(
    readonly storagePathRepo: StoragePathRepo,
  ) { }

  async execute(command: CreateStoragePath): Promise<void> {
    const storagePath = StoragePath.create(command.id, command.fileId, command.path)
    await this.storagePathRepo.addStoragePath(storagePath)
  }
}

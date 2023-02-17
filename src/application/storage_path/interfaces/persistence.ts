import { StoragePath as StoragePathDTO } from "@src/application/storage_path/dto/storage-path"
import { UUID } from "@src/domain/common/types"
import { StoragePath } from "@src/domain/storage_path/entities"


export interface StoragePathRepo {
  addStoragePath(StoragePath: StoragePath): Promise<void>
  deleteStoragePathById(id: UUID): Promise<void>
}

export interface StoragePathReader {
  getStoragePathById(id: UUID): Promise<StoragePathDTO>
}

import { File as FileDTO } from "@src/application/file/dto/file"
import { UUID } from "@src/utils/uuid"
import { File } from "@src/domain/file/entities"


export interface FileRepo {
  addFile(file: File): Promise<void>
  updateFile(file: File): Promise<void>
  deleteFileById(id: UUID): Promise<void>
}

export interface FileReader {
  getFileById(id: UUID): Promise<FileDTO>
}

import { File as FileDTO } from "@src/application/file/dto/file"
import { File } from "@src/domain/file/entities"
import { UUID } from "@src/utils/uuid"


export interface FileRepo {
  getFileById(id: UUID): Promise<File>

  addFile(file: File): Promise<void>
  updateFile(file: File): Promise<void>
  deleteFileById(id: UUID): Promise<void>
}

export interface FileReader {
  getFileById(id: UUID): Promise<FileDTO>
}

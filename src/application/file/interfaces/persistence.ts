import { BagId } from "@src/domain/bag/types"
import { File } from "@src/domain/file/entities"
import { File as FileDTO } from "@src/application/file/dto/file"
import { UUID } from "@src/utils/uuid"

export interface FileRepo {
    getFileById(id: UUID): Promise<File>
    addFile(file: File): Promise<void>
    updateFile(file: File): Promise<void>
    deleteFileById(id: UUID): Promise<void>
}

export interface FileReader {
    getFileById(id: UUID): Promise<FileDTO>
    getFilesByBagId(bagId: BagId): Promise<FileDTO[]>
}

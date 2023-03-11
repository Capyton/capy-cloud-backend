import { File as FileDTO } from "@src/application/file/dto"
import { FileIdNotFound } from "@src/application/file/exceptions"
import { FileReader, FileRepo } from "@src/application/file/interfaces"
import { UUID } from "@src/utils/uuid"
import { File } from "@src/domain/file/entities"
import { File as FileModel } from "@src/infrastructure/db/models"
import { QueryRunner } from "typeorm"

export class FileRepoImpl implements FileRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getFileById(id: UUID): Promise<File> {
        const file = await this.queryRunner.manager.findOne(FileModel, { where: { id: id } })
        if (!file) {
            throw new FileIdNotFound()
        }
        return file
    }

    async addFile(file: File): Promise<void> {
        await this.queryRunner.manager.insert(FileModel, file)
    }

    async updateFile(file: File): Promise<void> {
        await this.queryRunner.manager.update(FileModel, { where: { id: file.id } }, file)
    }

    async deleteFileById(id: UUID): Promise<void> {
        await this.queryRunner.manager.delete(FileModel, { where: { id: id } })
    }
}

export class FileReaderImpl implements FileReader {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getFileById(id: UUID): Promise<FileDTO> {
        const file = await this.queryRunner.manager.findOne(FileModel, { where: { id: id } })
        if (!file) {
            throw new FileIdNotFound()
        }
        return file
    }
}

import { Body, Controller, Post, UploadedFiles } from "@nestjs/common"
import {
    BagDir as ParamBagDir,
    BagId as ParamBagId,
    BagRepo as ParamBagRepo,
    FileRepo as ParamFileRepo,
    TorrentManager as ParamTorrentManager,
    TorrentReader as ParamTorrentReader,
    UnitOfWork as ParamUnitOfWork,
} from "@src/api/param_decorators"
import { CreateBag, CreateBagHandler } from "@src/application/bag/commands/create-bag"
import { BagRepo } from "@src/application/bag/interfaces"
import { UnitOfWork } from "@src/application/common/interfaces"
import { CreateFile, CreateFileHandler } from "@src/application/file/commands/create-file"
import { FileInfoNotFound, FileNotFound } from "@src/application/file/exceptions"
import { FileRepo } from "@src/application/file/interfaces"
import { CreateTorrent, CreateTorrentHandler } from "@src/application/torrent/commands/create-torrent"
import { TorrentManager } from "@src/application/torrent/interfaces"
import { Torrent } from "@src/domain/torrent/entities"
import { UUID, uuid7 } from "@src/utils/uuid"
import { IsOptional, IsString } from "class-validator"

class BagInfoDTO {
    @IsOptional()
    @IsString({ message: "Description must be a string" })
    readonly description: string | null
}

class FileInfoDTO {
    @IsString({ message: "Filename must be a string" })
    readonly filename: string
    @IsOptional()
    @IsString({ message: "Description must be a string" })
    readonly description: string | null
    @IsString({ message: "Path must be a string" })
    readonly pathDir: string
}

@Controller("torrent")
export class TorrentController {
    /**
     * Create a torrent.
     * User should upload files, send bag info and files info for each upload file.
     * @param files - The files to upload as files of a bag.
     * @param bagInfo - The bag info to create a bag with some information.
     * @param filesInfo - The files info for each upload file to save files with some information.
     * @returns The created torrent, which contains the bag id and progress information of the torrent.
     */
    @Post()
    async createTorrent(
        @ParamUnitOfWork() uow: UnitOfWork,
        @ParamFileRepo() fileRepo: FileRepo,
        @ParamBagRepo() bagRepo: BagRepo,
        @ParamTorrentManager() torrentManager: TorrentManager,
        @ParamBagId() bagId: UUID,
        @ParamBagDir() bagDir: string,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body("bagInfo") bagInfo: BagInfoDTO,
        @Body("filesInfo") filesInfo: Array<FileInfoDTO>,
    ): Promise<Torrent> {
        console.log(
            `files: json \`${JSON.stringify(files)}\`)\n`
            + `bagInfo: (json \`${JSON.stringify(bagInfo)}\`)\n`
            + `filesInfo: (json \`${JSON.stringify(filesInfo)}\`)\n`
        )

        const filesLength = files.length
        const filesInfoLength = filesInfo.length

        if (filesLength <= 0) {
            throw new FileNotFound("No files found")
        } else if (filesInfoLength <= 0) {
            throw new FileInfoNotFound("No files info found")
        } else if (filesLength > filesInfoLength) {
            const difference = filesLength - filesInfoLength

            throw new FileInfoNotFound(`No files info found for \`${difference}\``)
        }

        const createTorrentHandler = new CreateTorrentHandler(torrentManager)
        const createBagHandler = new CreateBagHandler(bagRepo, uow)
        const createFileHandler = new CreateFileHandler(fileRepo, uow)

        const bagDescription = bagInfo.description

        const torrent = await createTorrentHandler.execute(new CreateTorrent(bagDescription, bagDir))
        console.log(`torrent: (json \`${JSON.stringify(torrent)}\``)

        const bagIdDaemon = torrent.bagId
        const bagSize = torrent.totalSize

        await createBagHandler.execute(new CreateBag(bagId, bagIdDaemon, bagDescription, bagSize, false))

        for (const [fileIndex, file] of files.entries()) {
            console.log("fileIndex: ", fileIndex)

            const fileInfo = filesInfo[fileIndex]

            const fileId = uuid7()
            const filename = fileInfo.filename
            const pathDir = fileInfo.pathDir
            const description = fileInfo.description
            const size = file.size

            await createFileHandler.execute(new CreateFile(fileId, bagId, filename, pathDir, description, size))
        }

        return torrent
    }
}

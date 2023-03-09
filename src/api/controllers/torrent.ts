import {
    BadRequestException, Body, Controller, Get,
    Inject, Post, Query, UploadedFiles, UseInterceptors
} from "@nestjs/common"
import { FilesInterceptor } from "@src/api/interceptors"
import {
    BagDir,
    BagId as ParamBagId,
    BagRepo as ParamBagRepo,
    FileRepo as ParamFileRepo,
    TorrentManager as ParamTorrentManager,
    TorrentReader as ParamTorrentReader,
    UnitOfWork as ParamUnitOfWork
} from "@src/api/param_decorators"
import { CreateBag, CreateBagHandler } from "@src/application/bag/commands/create-bag"
import { BagRepo } from "@src/application/bag/interfaces"
import { UnitOfWork } from "@src/application/common/interfaces"
import { CreateFile, CreateFileHandler } from "@src/application/file/commands/create-file"
import { FileRepo } from "@src/application/file/interfaces"
import { CreateTorrent, CreateTorrentHandler } from "@src/application/torrent/commands/create-torrent"
import { TorrentManager, TorrentReader } from "@src/application/torrent/interfaces"
import { GetTorrentByBagId, GetTorrentByBagIdHandler } from "@src/application/torrent/queries/get-torrent-by-bag-id"
import { BagId } from "@src/domain/bag/types"
import { TorrentFull } from "@src/domain/torrent/entities"
import { STORAGE_DAEMON_CLI_KEY } from "@src/inject-constants"
import { uuid7 } from "@src/utils/uuid"
import { IsNotEmpty, IsOptional, IsString, validateOrReject } from "class-validator"
import TonStorageDaemonCLI from "tonstorage-cli"

class FileInfoDTO {
    @IsNotEmpty()
    @IsString()
    readonly filename: string
    @IsOptional()
    @IsString()
    readonly description: string | null = null
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly pathDir: string = "/"
}

function convertAttrsToFilesInfo(
    filenames: Array<string> | string,
    descriptions: Array<string | null> | string | null = null,
    pathDirs: Array<string> | string = "/",
): FileInfoDTO[] {
    let filesNamesLength: number
    let descriptionsLength: number
    let pathDirsLength: number

    if (typeof filenames === "string") {
        filenames = [filenames]
        filesNamesLength = 1
    } else {
        filesNamesLength = filenames.length
    }
    if (typeof descriptions === "string" || descriptions === null) {
        descriptions = [descriptions]
        descriptionsLength = 1
    } else {
        descriptionsLength = descriptions.length
    }
    if (typeof pathDirs === "string") {
        pathDirs = [pathDirs]
        pathDirsLength = 1
    } else {
        pathDirsLength = pathDirs.length
    }

    const equalsLength = (
        filesNamesLength === descriptionsLength
        && descriptionsLength === pathDirsLength
    )

    if (!equalsLength) {
        throw new BadRequestException("Filenames, descriptions and path dirs should have the same length")
    }

    let filesInfo: FileInfoDTO[] = []
    for (let index = 0; index < filesNamesLength; index++) {
        const filename = filenames[index]
        const description = descriptions[index]
        const pathDir = pathDirs[index]

        filesInfo.push({ filename, description, pathDir })
    }

    return filesInfo
}

@Controller("torrent")
export class TorrentController {
    constructor(
        @Inject(STORAGE_DAEMON_CLI_KEY) private readonly storageDaemonCli: TonStorageDaemonCLI,
    ) { }

    /**
     * Create a torrent from a bag of files
     * @param files - Files to upload as files of a bag
     * @param bagDescription - Description of bag of files
     * @param filenames - Filenames of files of a bag. If only one file is uploaded, this can be a string.
     * @param descriptions - Descriptions of files of a bag. If only one file is uploaded, this can be a string.
     * @param pathDirs - Path dirs of files of a bag. If only one file is uploaded, this can be a string.
     * @returns Created torrent
     */
    @Post()
    @UseInterceptors(FilesInterceptor)
    async createTorrent(
        @ParamUnitOfWork() uow: UnitOfWork,
        @ParamFileRepo() fileRepo: FileRepo,
        @ParamBagRepo() bagRepo: BagRepo,
        @ParamTorrentManager() torrentManager: TorrentManager,
        @ParamBagId() bagId: BagId,
        @BagDir() bagDir: string,
        @UploadedFiles() files: Express.Multer.File[],
        @Body("bagDescription") bagDescription: string | null = null,
        @Body("filenames") filenames?: Array<string> | string,
        @Body("descriptions") descriptions: Array<string | null> | string | null = null,
        @Body("pathDirs") pathDirs: Array<string> | string = "/",
    ): Promise<TorrentFull> {
        if (!filenames) {
            throw new BadRequestException("Filename(s) are required")
        }

        const filesInfo = convertAttrsToFilesInfo(filenames, descriptions, pathDirs)
        if (files.length !== filesInfo.length) {
            throw new BadRequestException("Files and files info should have the same length")
        } else {
            validateOrReject(filesInfo).catch(errors => {
                throw new BadRequestException(`Files info validation failed: \`${JSON.stringify(errors)}\``)
            })
        }

        const createTorrentHandler = new CreateTorrentHandler(torrentManager)
        const createBagHandler = new CreateBagHandler(bagRepo, uow)
        const createFileHandler = new CreateFileHandler(fileRepo, uow)

        const torrent = await createTorrentHandler.execute(new CreateTorrent(bagDescription, bagDir))

        const bagIdDaemon = torrent.bagId
        const bagSize = torrent.totalSize

        await createBagHandler.execute(new CreateBag(bagId, bagIdDaemon, bagDescription, bagSize, false))

        for (const [fileIndex, file] of files.entries()) {
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

    /**
     * Get a torrent by bag id
     * @param bagId - Bag id of torrent
     * @returns Torrent
     */
    @Get()
    getTorrent(
        @ParamTorrentReader() torrentReader: TorrentReader,
        @Query("bagId") bagId: BagId | undefined,
    ): Promise<TorrentFull> {
        if (!bagId) {
            throw new BadRequestException("Bag id is required")
        }

        const getTorrentByBagIdHandler = new GetTorrentByBagIdHandler(torrentReader)

        const torrent = getTorrentByBagIdHandler.execute(new GetTorrentByBagId(bagId))

        return torrent
    }
}

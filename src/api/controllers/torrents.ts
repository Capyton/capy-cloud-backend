import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    UploadedFiles,
    UseInterceptors,
} from "@nestjs/common"
import {
    BagDir,
    BagId as ParamBagId,
    BagRepo as ParamBagRepo,
    FileRepo as ParamFileRepo,
    TorrentManager as ParamTorrentManager,
    TorrentReader as ParamTorrentReader,
    UnitOfWork as ParamUnitOfWork,
    UserBagRepo as ParamUserBagRepo,
    UserPayloadFromAuthToken,
} from "@src/api/param_decorators"
import { CreateBag, CreateBagHandler } from "@src/application/bag/commands/create-bag"
import { CreateFile, CreateFileHandler } from "@src/application/file/commands/create-file"
import { CreateTorrent, CreateTorrentHandler } from "@src/application/torrent/commands/create-torrent"
import { CreateUserBag, CreateUserBagHandler } from "@src/application/user_bag/commands/create-user-bag"
import { GetTorrentByBagId, GetTorrentByBagIdHandler } from "@src/application/torrent/queries/get-torrent-by-bag-id"
import { IsNotEmpty, IsOptional, IsString, validateOrReject } from "class-validator"
import { TorrentManager, TorrentReader } from "@src/application/torrent/interfaces"

import { BagId } from "@src/domain/bag/types"
import { BagRepo } from "@src/application/bag/interfaces"
import { FileRepo } from "@src/application/file/interfaces"
import { FilesInterceptor } from "@src/api/interceptors"
import { TorrentFull } from "@src/domain/torrent/entities"
import { UnitOfWork } from "@src/application/common/interfaces"
import { UserBagRepo } from "@src/application/user_bag/interfaces"
import { UserPayload } from "@src/application/auth/dto"

import { uuid7 } from "@src/utils/uuid"

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

    const filesInfo: FileInfoDTO[] = []
    for (let index = 0; index < filesNamesLength; index++) {
        const filename = filenames[index]
        const description = descriptions[index]
        const pathDir = pathDirs[index]

        filesInfo.push({ filename, description, pathDir })
    }

    return filesInfo
}

@ApiTags("Torrents")
@Controller("torrens")
export class TorrentController {
    /**
     * Create a torrent from a bag of files
     * @param files - Files to upload as files of the bag
     * @param bagDescription - Description of the bag
     * @param filenames - Filenames of files of the bag. If only one file is uploaded, this can be a string.
     * @param descriptions - Descriptions of files of the bag. If only one file is uploaded, this can be a string and have default value.
     * @param pathDirs - Path dirs of files of the bag. If only one file is uploaded, this can be a string and have default value.
     * @returns Created torrent
     */
    @ApiOperation({ summary: "Create a torrent from a bag of files" })
    @ApiBearerAuth()
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                files: {
                    nullable: false,
                    title: "Files",
                    type: "array",
                    items: {
                        type: "string",
                        format: "binary",
                    },
                    description: "Files to upload as files of the bag",
                },
                bagDescription: {
                    nullable: true,
                    title: "Bag description",
                    type: "string",
                    description: "Description of the bag",
                },
                filenames: {
                    nullable: false,
                    title: "Filenames",
                    type: "array",
                    items: {
                        type: "string",
                    },
                    description: "Filenames of files of the bag. If only one file is uploaded, this can be a string.",
                },
                descriptions: {
                    nullable: true,
                    title: "Descriptions",
                    type: "array",
                    items: {
                        type: "string",
                    },
                    description: (
                        "Descriptions of files of the bag. " +
                        "If only one file is uploaded, this can be a string and have default value."
                    ),
                    default: null,
                },
                pathDirs: {
                    nullable: true,
                    title: "Path dirs",
                    type: "array",
                    items: {
                        type: "string",
                    },
                    description: (
                        "Path dirs of files of the bag. " +
                        "If only one file is uploaded, this can be a string and have default value."
                    ),
                    default: "/",
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: "Created torrent",
        schema: {
            nullable: false,
            type: "object",
            properties: {
                bagId: {
                    nullable: false,
                    title: "Bag id",
                    type: "string",
                    description: "Id of the bag",
                },
                bagHash: {
                    nullable: false,
                    title: "Bag hash",
                    type: "string",
                    description: "Hash of the bag",
                },
                totalSize: {
                    nullable: false,
                    title: "Total size",
                    type: "number",
                    description: "Total size of the bag",
                },
                description: {
                    nullable: true,
                    title: "Description",
                    type: "string",
                    description: "Description of the bag",
                },
                filesCount: {
                    nullable: false,
                    title: "Files count",
                    type: "number",
                    description: "Count of files of the bag",
                },
                includedSize: {
                    nullable: false,
                    title: "Included size",
                    type: "number",
                    description: "Included size of the bag",
                },
                downloadedSize: {
                    nullable: false,
                    title: "Downloaded size",
                    type: "number",
                    description: "Downloaded size of the bag",
                },
                activeDownload: {
                    nullable: false,
                    title: "Active download",
                    type: "boolean",
                    description: "Active download of the bag",
                },
                activeUpload: {
                    nullable: false,
                    title: "Active upload",
                    type: "boolean",
                    description: "Active upload of the bag",
                },
                completed: {
                    nullable: false,
                    title: "Completed",
                    type: "boolean",
                    description: "Completed of the bag",
                },
                downloadSpeed: {
                    nullable: false,
                    title: "Download speed",
                    type: "number",
                    description: "Download speed of the bag",
                },
                uploadSpeed: {
                    nullable: false,
                    title: "Upload speed",
                    type: "number",
                    description: "Upload speed of the bag",
                },
                fatalError: {
                    nullable: true,
                    title: "Fatal error",
                    type: "string",
                    description: "Fatal error of the bag",
                },
                files: {
                    nullable: false,
                    title: "Files",
                    type: "array",
                    items: {
                        nullable: false,
                        type: "object",
                        properties: {
                            name: {
                                nullable: false,
                                title: "Name",
                                type: "string",
                                description: "Name of the file",
                            },
                            size: {
                                nullable: false,
                                title: "Size",
                                type: "number",
                                description: "Size of the file",
                            },
                            priority: {
                                nullable: false,
                                title: "Priority",
                                type: "number",
                                description: "Priority of the file",
                            },
                            downloadedSize: {
                                nullable: false,
                                title: "Downloaded size",
                                type: "number",
                                description: "Downloaded size of the file",
                            },
                        },
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: (
            "Filename(s) are required | " +
            "Filenames, descriptions and path dirs should have the same length | " +
            "Files and files info should have the same length | " +
            "Files info validation failed | " +
            "Torrent create error"
        ),
    })
    @ApiResponse({
        status: 401,
        description: (
            "Unauthorized | " +
            "JWT token is expired | " +
            "Invalid JWT token | " +
            "Unknown JWT token error"
        ),
    })
    @Post()
    @UseInterceptors(FilesInterceptor)
    async createTorrent(
        @ParamUnitOfWork() uow: UnitOfWork,
        @ParamFileRepo() fileRepo: FileRepo,
        @ParamBagRepo() bagRepo: BagRepo,
        @ParamUserBagRepo() userBagRepo: UserBagRepo,
        @ParamTorrentManager() torrentManager: TorrentManager,
        @ParamBagId() bagId: BagId,
        @BagDir() bagDir: string,
        @UploadedFiles() files: Express.Multer.File[],
        @UserPayloadFromAuthToken() userPayload: UserPayload,
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
                console.error(`Files info validation failed: \`${JSON.stringify(errors)}\``)

                throw new BadRequestException("Files info validation failed")
            })
        }

        const createTorrentHandler = new CreateTorrentHandler(torrentManager)
        const createBagHandler = new CreateBagHandler(bagRepo, uow)
        const createFileHandler = new CreateFileHandler(fileRepo, uow)
        const createUserBagHandler = new CreateUserBagHandler(userBagRepo, uow)

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

        await createUserBagHandler.execute(new CreateUserBag(uuid7(), userPayload.id, bagId))

        return torrent
    }

    /**
     * Get a torrent by bag id
     * @param bagId - Bag id of the torrent
     * @returns Torrent
     */
    @ApiOperation({ summary: "Get a torrent by bag id" })
    @ApiParam({
        schema: {
            nullable: false,
            title: "Bag id",
            type: "string",
            description: "Bag id of the torrent",
        },
        name: "bagId",
    })
    @ApiResponse({
        status: 200,
        description: "Torrent",
        schema: {
            nullable: false,
            type: "object",
            properties: {
                bagId: {
                    nullable: false,
                    title: "Bag id",
                    type: "string",
                    description: "Id of the bag",
                },
                bagHash: {
                    nullable: false,
                    title: "Bag hash",
                    type: "string",
                    description: "Hash of the bag",
                },
                totalSize: {
                    nullable: false,
                    title: "Total size",
                    type: "number",
                    description: "Total size of the bag",
                },
                description: {
                    nullable: true,
                    title: "Description",
                    type: "string",
                    description: "Description of the bag",
                },
                filesCount: {
                    nullable: false,
                    title: "Files count",
                    type: "number",
                    description: "Count of files of the bag",
                },
                includedSize: {
                    nullable: false,
                    title: "Included size",
                    type: "number",
                    description: "Included size of the bag",
                },
                downloadedSize: {
                    nullable: false,
                    title: "Downloaded size",
                    type: "number",
                    description: "Downloaded size of the bag",
                },
                activeDownload: {
                    nullable: false,
                    title: "Active download",
                    type: "boolean",
                    description: "Active download of the bag",
                },
                activeUpload: {
                    nullable: false,
                    title: "Active upload",
                    type: "boolean",
                    description: "Active upload of the bag",
                },
                completed: {
                    nullable: false,
                    title: "Completed",
                    type: "boolean",
                    description: "Completed of the bag",
                },
                downloadSpeed: {
                    nullable: false,
                    title: "Download speed",
                    type: "number",
                    description: "Download speed of the bag",
                },
                uploadSpeed: {
                    nullable: false,
                    title: "Upload speed",
                    type: "number",
                    description: "Upload speed of the bag",
                },
                fatalError: {
                    nullable: true,
                    title: "Fatal error",
                    type: "string",
                    description: "Fatal error of the bag",
                },
                files: {
                    nullable: false,
                    title: "Files",
                    type: "array",
                    items: {
                        nullable: false,
                        type: "object",
                        properties: {
                            name: {
                                nullable: false,
                                title: "Name",
                                type: "string",
                                description: "Name of the file",
                            },
                            size: {
                                nullable: false,
                                title: "Size",
                                type: "number",
                                description: "Size of the file",
                            },
                            priority: {
                                nullable: false,
                                title: "Priority",
                                type: "number",
                                description: "Priority of the file",
                            },
                            downloadedSize: {
                                nullable: false,
                                title: "Downloaded size",
                                type: "number",
                                description: "Downloaded size of the file",
                            },
                        },
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: "Torrent get by bag id error",
    })
    @Get(":bagId")
    getTorrent(
        @ParamTorrentReader() torrentReader: TorrentReader,
        @Param("bagId") bagId: BagId,
    ): Promise<TorrentFull> {
        const getTorrentByBagIdHandler = new GetTorrentByBagIdHandler(torrentReader)

        const torrent = getTorrentByBagIdHandler.execute(new GetTorrentByBagId(bagId))

        return torrent
    }
}

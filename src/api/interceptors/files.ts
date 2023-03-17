import * as fs from "fs"

import { BadRequestException, CallHandler, ExecutionContext, HttpException, Inject, Injectable, NestInterceptor } from "@nestjs/common"
import { FILES_CONFIG, FILES_FIELD_KEY } from "@src/inject-constants"
import { Observable, catchError, throwError } from "rxjs"
import { Request, Response } from "express"

import { BagId } from "@src/domain/bag/types"
import { FilesConfig } from "@src/api/config"
import multer from "multer"
import { trim } from "@src/utils/string"
import { uuid7 } from "@src/utils/uuid"

/**
 * Files interceptor.
 * This interceptor is used to process file downloads.
 * It creates a directory for files and saves them in it.
 * The directory is created using the config upload directory and a bag id.
 * The `bagId` id is created in the interceptor and added to the request.
 * The `badDir` is created in the interceptor and added to the request.
 * @param {FilesConfig} config - Files config.
 * @param {string} fieldName - Shared name of the multipart form fields to process.
 */
@Injectable()
export class FilesInterceptor implements NestInterceptor {
    constructor(
        @Inject(FILES_CONFIG) private readonly config: FilesConfig,
        @Inject(FILES_FIELD_KEY) private readonly fieldName: string, // field name in the request
    ) { }

    getBagDir(bagId: BagId): string {
        return `${this.config.uploadDir}/${bagId}`
    }

    mkdirBagDir(bagDirPath: string) {
        fs.mkdirSync(bagDirPath, { recursive: true })
    }

    getMulter(storage: multer.StorageEngine): multer.Multer {
        return multer({
            storage: storage,
            dest: this.config.uploadDir,
            limits: {
                fileSize: this.config.maxFileSize,
                files: this.config.maxFilesCount,
            },
        })
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest<Request>()
        const res = ctx.getResponse<Response>()

        // Create the bag id to use it as a directory name for the files.
        // This is done to avoid name collisions.
        const bagId = uuid7()
        const bagDir = this.getBagDir(bagId)
        this.mkdirBagDir(bagDir)

        let indexOfFile = 0
        const pathDirs: string[] = []
        const filenames: string[] = []

        const storageEngine = multer.diskStorage({
            destination: (req, _file, cb) => {
                const body = req.body as Record<string, unknown>
                const bodyPathDirs = body.pathDirs as string[] | string | undefined

                if (!bodyPathDirs) {
                    pathDirs.push("/")
                    cb(null, bagDir)
                } else if (typeof bodyPathDirs === "string") {
                    if (indexOfFile >= 1) {
                        pathDirs.push("/")
                        cb(null, bagDir)
                    } else {
                        const bodyPathDir = `/${trim(bodyPathDirs, " /")}`
                        const pathDir = `${bagDir}${bodyPathDir}`

                        pathDirs.push(bodyPathDir)
                        this.mkdirBagDir(pathDir)
                        cb(null, pathDir)
                    }
                } else if (Array.isArray(bodyPathDirs)) {
                    if (bodyPathDirs.length > indexOfFile) {

                        const bodyPathDir = `/${trim(bodyPathDirs[indexOfFile], " /")}`
                        const pathDir = `${bagDir}${bodyPathDir}`

                        pathDirs.push(bodyPathDir)
                        this.mkdirBagDir(pathDir)
                        cb(null, pathDir)
                    } else {
                        pathDirs.push("/")
                        cb(null, bagDir)
                    }
                } else {
                    cb(new BadRequestException("Invalid pathDirs"), "")
                }

                indexOfFile++
            },
            filename: (req, file, cb) => {
                const body = req.body as Record<string, unknown>
                const bodyFilenames = body.filenames as string[] | string | undefined

                if (!bodyFilenames) {
                    const filename = file.originalname

                    filenames.push(filename)
                    cb(null, filename)
                } else if (typeof bodyFilenames === "string") {
                    if (indexOfFile >= 1) {
                        const filename = file.originalname

                        filenames.push(filename)
                        cb(null, filename)
                    } else {
                        const filename = bodyFilenames

                        filenames.push(filename)
                        cb(null, filename)
                    }
                } else if (Array.isArray(bodyFilenames)) {
                    if (bodyFilenames.length > indexOfFile) {
                        const filename = bodyFilenames[indexOfFile]

                        filenames.push(filename)
                        cb(null, filename)
                    } else {
                        const filename = file.originalname

                        filenames.push(filename)
                        cb(null, filename)
                    }
                }
            },
        })

        await new Promise<void>((resolve, reject) => {
            this.getMulter(storageEngine).array(this.fieldName)(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    console.error("Multer error uploading files: ", err)

                    reject(err)

                    switch (err.code) {
                        case "LIMIT_PART_COUNT":
                            res.status(413).send("Too many parts")
                            break
                        case "LIMIT_FILE_SIZE":
                            res.status(413).send(`File too large. Max file size is ${this.config.maxFileSize} bytes`)
                            break
                        case "LIMIT_FILE_COUNT":
                            res.status(413).send(`Too many files. Max files count is ${this.config.maxFilesCount}`)
                            break
                        case "LIMIT_FIELD_KEY":
                            res.status(413).send("Field name too long")
                            break
                        case "LIMIT_FIELD_VALUE":
                            res.status(413).send("Field value too long")
                            break
                        case "LIMIT_FIELD_COUNT":
                            res.status(413).send("Too many fields")
                            break
                        case "LIMIT_UNEXPECTED_FILE":
                            res.status(413).send("Unexpected field")
                            break
                    }
                } else if (err instanceof HttpException) {
                    console.error("HTTP error uploading files: ", err)

                    reject(err)

                    res.status(err.getStatus()).send(err.getResponse())
                } else if (err) {
                    console.error("Unknown error uploading files: ", err)

                    reject(err)

                    res.status(500).send("Unknown error uploading files")
                } else {
                    if (indexOfFile === 0) {
                        reject(new BadRequestException("No files have been uploaded"))

                        return res.status(400).send("No files have been uploaded")
                    }

                    console.debug("Files uploaded successfully")

                    resolve()
                }
            })
        })

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        req.body.pathDirs = pathDirs
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        req.body.filenames = filenames
        req.app.locals.bagId = bagId
        req.app.locals.bagDir = bagDir

        return next.handle().pipe(
            catchError((err) => {
                console.error("Error in handler: ", err)

                fs.rm(bagDir, { recursive: true }, (err) => {
                    if (err) {
                        console.error(`Error delete directory \`${bagDir}\`: ${err.message}`)
                    } else {
                        console.debug(`Directory \`${bagDir}\` has been deleted successfully`)
                    }
                })

                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return throwError(() => err)
            }),
        )
    }
}

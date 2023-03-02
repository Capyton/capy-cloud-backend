import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common"
import { FilesConfig } from "@src/api/config"
import { BagId } from "@src/domain/bag/types"
import { FILES_CONFIG, FILES_FIELD_KEY } from "@src/inject-constants"
import { uuid7 } from "@src/utils/uuid"
import { Request, Response } from "express"
import * as fs from "fs"
import multer from "multer"
import { Observable } from "rxjs"

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
        const path = `${this.config.uploadDir}/${bagId}`

        // Create the directory for the files, if it doesn't exist
        fs.mkdirSync(path, { recursive: true })

        return path
    }

    getStorageEngine(bagDir: string): multer.StorageEngine {
        return multer.diskStorage({
            destination: (_req, _file, cb) => {
                console.log(`file: (json \`${JSON.stringify(_file)})\``)

                cb(null, bagDir)
            },
            filename: (_req, file, cb) => {
                console.log(`file: (json \`${JSON.stringify(file)})\``)

                cb(null, file.originalname)
            }
        })
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

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const ctx = context.switchToHttp()
        const req = ctx.getRequest<Request>()
        const res = ctx.getResponse<Response>()

        // Create the bag id to use it as a directory name for the files.
        // This is done to avoid name collisions.
        const bagId = uuid7()
        const bagDir = this.getBagDir(bagId)

        await new Promise<void>((resolve, reject) => {
            this.getMulter(this.getStorageEngine(bagDir)).array(this.fieldName)(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    console.error(`Error uploading files: ${err.message}`)

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
                } else if (err) {
                    console.error(`Unknown error uploading files: ${err.message}`)

                    reject(err)

                    res.status(500).send(err.message)
                } else {
                    console.log(`Files uploaded successfully`)

                    resolve()
                }
            })
        })

        req.app.locals.bagId = bagId
        req.app.locals.bagDir = bagDir

        return next.handle()
    }
}

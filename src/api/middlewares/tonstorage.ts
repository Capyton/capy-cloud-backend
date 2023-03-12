import { Inject, Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

import { STORAGE_DAEMON_CLI_KEY } from "@src/inject-constants"
import TonstorageCLI from "tonstorage-cli"

/**
 * TonStorageMiddleware is a middleware that injects the storageDaemonCLI into the request.
 */
@Injectable()
export class TonStorageMiddleware implements NestMiddleware {
    constructor(
        @Inject(STORAGE_DAEMON_CLI_KEY) private readonly storageDaemonCLI: TonstorageCLI,
    ) { }

    use(req: Request, _res: Response, next: NextFunction) {
        req.app.locals.storageDaemonCLI = this.storageDaemonCLI

        next()
    }
}

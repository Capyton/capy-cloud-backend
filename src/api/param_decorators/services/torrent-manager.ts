/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { Request } from "express"
import TonstorageCLI from "tonstorage-cli"
import { TorrentManagerImpl } from "@src/infrastructure/torrent-manager"

export const TorrentManager = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `TonstorageCLI` from the request, which was set in a ton storage middleware
        const storageDaemonCLI: TonstorageCLI = request.app.locals.storageDaemonCLI
        const torrentManager = new TorrentManagerImpl(storageDaemonCLI, null)

        return torrentManager
    },
)

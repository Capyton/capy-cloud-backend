import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { TorrentManagerImpl } from "@src/infrastructure/torrent-manager"
import { Request } from "express"
import TonstorageCLI from "tonstorage-cli"

export const TorrentManager = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `TonstorageCLI` from the request, which was set in a ton storage middleware
        const storageDaemonCLI: TonstorageCLI = request.app.locals.storageDaemonCLI
        const torrentManager = new TorrentManagerImpl(storageDaemonCLI)

        return torrentManager
    }
)

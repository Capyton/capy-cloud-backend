import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { TorrentReaderImpl } from "@src/infrastructure/torrent-reader"
import { Request } from "express"
import TonstorageCLI from "tonstorage-cli"

export const TorrentReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `TonstorageCLI` from the request, which was set in a ton storage middleware
        const storageDaemonCLI: TonstorageCLI = request.app.locals.storageDaemonCLI
        const torrentReader = new TorrentReaderImpl(storageDaemonCLI)

        return torrentReader
    }
)

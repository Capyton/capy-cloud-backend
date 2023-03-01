import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { TorrentReaderImpl } from "@src/infrastructure/torrent-reader"
import { Request } from "express"

export const TorrentReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const _request: Request = ctx.switchToHttp().getRequest()
        // TODO: Add `ton-storage-daemon` and it's client to the arguments
        const torrentReader = new TorrentReaderImpl()

        return torrentReader
    }
)

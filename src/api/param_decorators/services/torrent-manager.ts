import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { TorrentManagerImpl } from "@src/infrastructure/torrent-manager"
import { Request } from "express"

export const TorrentManager = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const _request: Request = ctx.switchToHttp().getRequest()
        // TODO: Add `ton-storage-daemon` and it's client to the arguments
        const torrentManager = new TorrentManagerImpl()

        return torrentManager
    }
)

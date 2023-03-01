import { Module } from "@nestjs/common"
import { TorrentController } from "@src/api/controllers"

@Module({
    controllers: [TorrentController],
})
export class TorrentModule { }

import { Module } from "@nestjs/common"
import { AuthModule } from "./auth"
import { TorrentModule } from "./torrent"
import { UserModule } from "./user"

@Module({
    imports: [AuthModule, TorrentModule, UserModule],
})
export class AppModule { }

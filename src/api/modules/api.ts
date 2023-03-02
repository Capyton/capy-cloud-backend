import { DynamicModule, Module, Scope } from "@nestjs/common"
import { Config } from "@src/api/config"
import { API_CONFIG } from "@src/inject-constants"
import { DataSource } from "typeorm"
import { AuthModule } from "./auth"
import { TorrentModule } from "./torrent"
import { UserModule } from "./user"

@Module({})
export class APIModule {
    static forRoot(config: Config, dataSource: DataSource): DynamicModule {
        return {
            module: APIModule,
            imports: [
                AuthModule.forRoot(config.authAndTokens, dataSource),
                TorrentModule.forRoot(config.files, dataSource),
                UserModule.forRoot(),
            ],
            providers: [
                {
                    provide: API_CONFIG,
                    useValue: config.api,
                    scope: Scope.DEFAULT,
                },
            ],
            exports: [
                API_CONFIG,
                AuthModule,
                TorrentModule,
                UserModule,
            ]
        }
    }
}

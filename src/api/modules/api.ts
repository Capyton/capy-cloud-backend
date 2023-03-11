import { DynamicModule, Module, Scope } from "@nestjs/common"
import { Config } from "@src/api/config"
import { API_CONFIG } from "@src/inject-constants"
import TonstorageCLI from "tonstorage-cli"
import { DataSource } from "typeorm"
import { AuthModule } from "./auth"
import { BagModule } from "./bags"
import { TorrentModule } from "./torrents"
import { UserModule } from "./users"

@Module({})
export class ApiModule {
    static forRoot(
        config: Config,
        dataSource: DataSource,
        storageDaemonCLI: TonstorageCLI,
    ): DynamicModule {
        return {
            module: ApiModule,
            imports: [
                AuthModule.forRoot(config.authAndTokens, dataSource),
                TorrentModule.forRoot(config.files, dataSource, storageDaemonCLI),
                UserModule.forRoot(),
                BagModule.forRoot(),
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
                BagModule,
            ]
        }
    }
}

import { DynamicModule, Module, Scope } from "@nestjs/common"
import { FilesConfig } from "@src/api/config"
import { TorrentController } from "@src/api/controllers"
import * as fieldConstants from "@src/field-constants"
import { DATA_SOURCE, FILES_CONFIG, FILES_FIELD_KEY, STORAGE_DAEMON_CLI_KEY } from "@src/inject-constants"
import TonstorageCLI from "tonstorage-cli"
import { DataSource } from "typeorm"

@Module({})
export class TorrentModule {
    static forRoot(
        config: FilesConfig,
        dataSource: DataSource,
        storageDaemonCLI: TonstorageCLI,
    ): DynamicModule {
        return {
            module: TorrentModule,
            controllers: [TorrentController],
            providers: [
                {
                    provide: DATA_SOURCE,
                    useValue: dataSource,
                    scope: Scope.DEFAULT,
                },
                {
                    provide: FILES_CONFIG,
                    useValue: config,
                    scope: Scope.DEFAULT,
                },
                {
                    provide: FILES_FIELD_KEY,
                    useValue: fieldConstants.FILES_FIELD_KEY,
                    scope: Scope.DEFAULT,
                },
                {
                    provide: STORAGE_DAEMON_CLI_KEY,
                    useValue: storageDaemonCLI,
                    scope: Scope.DEFAULT,
                },
            ],
            exports: [
                DATA_SOURCE,
                FILES_CONFIG,
                STORAGE_DAEMON_CLI_KEY,
            ]
        }
    }
}

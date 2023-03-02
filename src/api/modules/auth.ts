import { DynamicModule, Module, Scope } from "@nestjs/common"
import { AuthAndTokensConfig } from "@src/api/config"
import { AuthController } from "@src/api/controllers"
import { AUTH_AND_TOKENS_CONFIG, DATA_SOURCE } from "@src/inject-constants"
import { DataSource } from "typeorm"

@Module({})
export class AuthModule {
    static forRoot(config: AuthAndTokensConfig, dataSource: DataSource): DynamicModule {
        return {
            module: AuthModule,
            controllers: [AuthController],
            providers: [
                {
                    provide: DATA_SOURCE,
                    useValue: dataSource,
                    scope: Scope.DEFAULT,
                },
                {
                    provide: AUTH_AND_TOKENS_CONFIG,
                    useValue: config,
                    scope: Scope.DEFAULT,
                },
            ],
            exports: [
                DATA_SOURCE,
                AUTH_AND_TOKENS_CONFIG,
            ],
        }
    }
}

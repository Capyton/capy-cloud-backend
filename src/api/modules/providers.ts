import { DynamicModule, Module } from "@nestjs/common"

import { ProviderController } from "@src/api/controllers"

@Module({})
export class ProviderModule {
    static forRoot(): DynamicModule {
        return {
            module: ProviderModule,
            controllers: [ProviderController],
        }
    }
}

import { DynamicModule, Module } from "@nestjs/common"
import { BagController } from "@src/api/controllers"

@Module({})
export class BagModule {
    static forRoot(): DynamicModule {
        return {
            module: BagModule,
            controllers: [BagController],
        }
    }
}

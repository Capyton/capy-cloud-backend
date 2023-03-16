import { DynamicModule, Module } from "@nestjs/common"

import { FileController } from "@src/api/controllers"

@Module({})
export class FileModule {
    static forRoot(): DynamicModule {
        return {
            module: FileModule,
            controllers: [FileController],
        }
    }
}

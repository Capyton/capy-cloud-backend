import { DynamicModule, Module } from "@nestjs/common"

import { UserController } from "@src/api/controllers"

@Module({})
export class UserModule {
    static forRoot(): DynamicModule {
        return {
            module: UserModule,
            controllers: [UserController],
        }
    }
}

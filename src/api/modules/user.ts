import { Module } from "@nestjs/common"
import { UserController } from "@src/api/controllers"

@Module({
    controllers: [UserController],
})
export class UserModule { }

import { Module } from "@nestjs/common"
import { AuthController } from "@src/api/controllers"

@Module({
    controllers: [AuthController],
})
export class AuthModule { }

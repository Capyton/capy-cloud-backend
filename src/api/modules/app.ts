import { Module } from "@nestjs/common"
import { AuthModule } from "./auth"
import { UserModule } from "./user"

@Module({
    imports: [UserModule, AuthModule],
})
export class AppModule { }

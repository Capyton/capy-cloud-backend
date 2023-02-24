import { Controller, Get } from "@nestjs/common"
import { UserRepo as ParamUserRepo } from "@src/api/param_decorators/repositories"
import { UserRepo } from "@src/application/user/interfaces"

@Controller("user")
export class UserController {
    @Get()
    async getUser(@ParamUserRepo() userRepo: UserRepo) {
        return "Hello World"
    }
}

import { Controller, Get } from "@nestjs/common"
import { User as ParamUserRepo } from "@src/api/param_decorators/repositories"
import { UserRepo } from "@src/application/user/interfaces"

@Controller("user")
export class UserController {
    @Get()
    async getUser(@ParamUserRepo() user_repo: UserRepo) {
        return "Hello World"
    }
}

import { Controller, Get } from "@nestjs/common"
import { UserPayloadFromAuthToken, UserReader as ParamUserReader } from "@src/api/param_decorators"
import { UserPayload } from "@src/application/auth/dto"
import { User } from "@src/application/user/dto"
import { UserReader } from "@src/application/user/interfaces"
import { GetUserById, GetUserByIdHandler } from "@src/application/user/queries/get-user-by-id"

@Controller("users")
export class UserController {
    @Get("me")
    getUser(
        @ParamUserReader() userReader: UserReader,
        @UserPayloadFromAuthToken() userPayload: UserPayload,
    ): Promise<User> {
        const userHandler = new GetUserByIdHandler(userReader)
        const user = userHandler.execute(new GetUserById(userPayload.id))

        return user
    }
}

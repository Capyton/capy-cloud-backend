import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Controller, Get } from "@nestjs/common"
import { GetUserById, GetUserByIdHandler } from "@src/application/user/queries/get-user-by-id"
import { UserReader as ParamUserReader, UserPayloadFromAuthToken } from "@src/api/param_decorators"

import { User } from "@src/application/user/dto"
import { UserPayload } from "@src/application/auth/dto"
import { UserReader } from "@src/application/user/interfaces"

@ApiTags("Users")
@Controller("users")
export class UserController {
    @ApiOperation({ summary: "Get a user by an auth token" })
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: "User info",
        schema: {
            nullable: false,
            type: "object",
            properties: {
                id: {
                    nullable: false,
                    title: "User id",
                    type: "string",
                    format: "uuid",
                    description: "User id",
                },
                address: {
                    nullable: false,
                    title: "User address",
                    type: "string",
                    description: "User address",
                },
                registeredAt: {
                    nullable: false,
                    title: "User registered at",
                    type: "string",
                    format: "date-time",
                    description: "User registered at",
                },
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: (
            "Unauthorized | " +
            "JWT token is expired | " +
            "Invalid JWT token | " +
            "Unknown JWT token error"
        ),
    })
    @ApiResponse({
        status: 404,
        description: "User id not found",
    })
    @Get()
    getUserByAuthToken(
        @ParamUserReader() userReader: UserReader,
        @UserPayloadFromAuthToken() userPayload: UserPayload,
    ): Promise<User> {
        const userHandler = new GetUserByIdHandler(userReader)
        const user = userHandler.execute(new GetUserById(userPayload.id))

        return user
    }
}

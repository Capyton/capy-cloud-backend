import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { JwtManager } from "@src/application/auth/interfaces"
import { Request } from "express"

export const UserPayloadFromAuthToken = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()

        const authToken = request.headers.authorization
        // Get the `JwtManager` from the request, which was set in a jwt manager middleware
        const jwtManager: JwtManager = request.app.locals.jwtManager

        if (!authToken) {
            throw new UnauthorizedException("Auth token is required")
        }

        const userPayload = jwtManager.validateToken(authToken)

        return userPayload
    }
)

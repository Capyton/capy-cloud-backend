/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common"

import { JwtManager } from "@src/application/auth/interfaces"
import { Request } from "express"


function checkAuthData(authData: string): string | null {
    const regex = /^Bearer:\s*(?<authToken>\S+)\s*$/
    const match = authData.match(regex)
    if (match && match.groups) {
        return match.groups.authToken || null
    }
    return null
}


export const UserPayloadFromAuthToken = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()

        const authToken = checkAuthData(request.headers.authorization || "") || ""

        // Get the `JwtManager` from the request, which was set in a jwt manager middleware
        const jwtManager: JwtManager = request.app.locals.jwtManager

        if (!authToken) {
            throw new UnauthorizedException("Auth token is required")
        }

        const userPayload = jwtManager.validateToken(authToken)

        return userPayload
    },
)

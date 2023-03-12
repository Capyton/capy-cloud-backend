/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { AuthManagerImpl } from "@src/infrastructure/auth-manager"
import { Config } from "@src/api/config"
import { Request } from "express"

export const AuthManager = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `Config` from the request, which was set in a config middleware
        const config: Config = request.app.locals.config
        const authAndTokensConfig = config.authAndTokens
        const authManager = new AuthManagerImpl(authAndTokensConfig.privateKey, authAndTokensConfig.nonceExpirationTime)

        return authManager
    },
)

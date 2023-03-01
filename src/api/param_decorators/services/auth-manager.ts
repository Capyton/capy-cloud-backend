import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Config } from "@src/api/config"
import { AuthManagerImpl } from "@src/infrastructure/auth-manager"
import { Request } from "express"

export const AuthManager = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `Config` from the request, which was set in a config middleware
        const config: Config = request.app.locals.config
        const authAndTokensConfig = config.authAndTokens
        const authManager = new AuthManagerImpl(authAndTokensConfig.privateKey, authAndTokensConfig.nonceExpirationTime)

        return authManager
    }
)

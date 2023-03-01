import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Config } from "@src/api/config"
import { JwtManagerImpl } from "@src/infrastructure/jwt-manager"
import { Request } from "express"

export const JwtManager = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `Config` from the request, which was set in a config middleware
        const config: Config = request.app.locals.config
        const authAndTokensConfig = config.authAndTokens
        const jwtManager = new JwtManagerImpl(authAndTokensConfig.privateKey, authAndTokensConfig.accessTokenExpirationTime)

        return jwtManager
    }
)

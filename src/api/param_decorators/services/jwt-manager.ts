import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Config } from "@src/api/config"
import { JwtManagerImpl } from "@src/infrastructure/jwt-manager"

export const JwtManager = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `Config` from the request, which was set in a config middleware
        const config: Config = request.config
        const authAndTokensConfig = config.authAndTokens
        const jwtManager = new JwtManagerImpl(authAndTokensConfig.privateKey, authAndTokensConfig.accessTokenExpirationTime)

        return jwtManager
    }
)

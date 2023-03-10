import { Inject, Injectable, NestMiddleware } from "@nestjs/common"
import { AuthAndTokensConfig } from "@src/api/config"
import { JwtManagerImpl } from "@src/infrastructure/jwt-manager"
import { AUTH_AND_TOKENS_CONFIG } from "@src/inject-constants"
import { NextFunction, Request, Response } from "express"

/**
 * JwtManagerMiddleware is a middleware that injects the config into the request.
 */
@Injectable()
export class JwtManagerMiddleware implements NestMiddleware {
    constructor(
        @Inject(AUTH_AND_TOKENS_CONFIG) private readonly config: AuthAndTokensConfig,
    ) { }

    async use(req: Request, _res: Response, next: NextFunction) {
        const jwtManager = new JwtManagerImpl(this.config.privateKey, this.config.accessTokenExpirationTime)

        req.app.locals.jwtManager = jwtManager

        next()
    }
}

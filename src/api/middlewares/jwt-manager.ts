import { Inject, Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

import { AUTH_AND_TOKENS_CONFIG } from "@src/inject-constants"
import { AuthAndTokensConfig } from "@src/api/config"
import { JwtManagerImpl } from "@src/infrastructure/jwt-manager"

/**
 * JwtManagerMiddleware is a middleware that injects the config into the request.
 */
@Injectable()
export class JwtManagerMiddleware implements NestMiddleware {
    constructor(
        @Inject(AUTH_AND_TOKENS_CONFIG) private readonly config: AuthAndTokensConfig,
    ) { }

    use(req: Request, _res: Response, next: NextFunction) {
        const jwtManager = new JwtManagerImpl(this.config.privateKey, this.config.accessTokenExpirationTime)

        req.app.locals.jwtManager = jwtManager

        next()
    }
}

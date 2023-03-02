import { Inject, Injectable, NestMiddleware } from "@nestjs/common"
import { Config } from "@src/api/config"
import { CONFIG } from "@src/inject-constants"
import { NextFunction, Request, Response } from "express"

/**
 * ConfigMiddleware is a middleware that injects the config into the request.
 */
@Injectable()
export class ConfigMiddleware implements NestMiddleware {
    constructor(@Inject(CONFIG) private readonly config: Config) { }

    async use(req: Request, _res: Response, next: NextFunction) {
        req.app.locals.config = this.config

        next()
    }
}

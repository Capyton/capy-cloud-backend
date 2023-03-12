import { Inject, Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

import { CONFIG } from "@src/inject-constants"
import { Config } from "@src/api/config"

/**
 * ConfigMiddleware is a middleware that injects the config into the request.
 */
@Injectable()
export class ConfigMiddleware implements NestMiddleware {
    constructor(@Inject(CONFIG) private readonly config: Config) { }

    use(req: Request, _res: Response, next: NextFunction) {
        req.app.locals.config = this.config

        next()
    }
}

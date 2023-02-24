import { Injectable, NestMiddleware } from "@nestjs/common"
import { Config } from "@src/api/config"
import { NextFunction, Request, Response } from "express"

@Injectable()
export class ConfigMiddleware implements NestMiddleware {
    constructor(private readonly config: Config) { }

    async use(req: Request, _res: Response, next: NextFunction) {
        req.app.locals.config = this.config

        next()
    }
}

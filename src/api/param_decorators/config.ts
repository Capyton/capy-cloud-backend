/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { Config as ApiConfig } from "@src/api/config"
import { Request } from "express"

export const Config = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `ApiConfig` from the request, which was set in a config middleware
        const config: ApiConfig = request.app.locals.config

        return config
    },
)

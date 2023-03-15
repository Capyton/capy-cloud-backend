/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { ProviderManagerImpl } from "@src/infrastructure/provider-manager"
import { Request } from "express"
import TonstorageCLI from "tonstorage-cli"

export const ProviderManager = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `TonstorageCLI` from the request, which was set in a ton storage middleware
        const storageDaemonCLI: TonstorageCLI = request.app.locals.storageDaemonCLI
        const providerManager = new ProviderManagerImpl(storageDaemonCLI)

        return providerManager
    },
)

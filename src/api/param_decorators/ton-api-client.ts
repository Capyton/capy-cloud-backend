/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { TonApiClientImpl } from "@src/infrastructure/ton-api-client"

export const TonApiClient = createParamDecorator(
    (_data: unknown, _ctx: ExecutionContext) => {
        const authManager = new TonApiClientImpl()

        return authManager
    },
)

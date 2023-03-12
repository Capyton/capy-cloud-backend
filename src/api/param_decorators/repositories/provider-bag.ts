/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { ProviderBagReaderImpl, ProviderBagRepoImpl } from "@src/infrastructure/db/repositories"

import { QueryRunner } from "typeorm"
import { Request } from "express"

export const ProviderBagRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const providerBag = new ProviderBagRepoImpl(queryRunner)

        return providerBag
    },
)

export const ProviderBagReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const providerBag = new ProviderBagReaderImpl(queryRunner)

        return providerBag
    },
)

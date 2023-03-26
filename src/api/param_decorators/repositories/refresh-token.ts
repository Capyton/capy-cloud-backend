/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { QueryRunner } from "typeorm"
import { RefreshTokenRepoImpl } from "@src/infrastructure/db/repositories/refresh-token"
import { Request } from "express"

export const RefreshTokenRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const refreshTokenRepo = new RefreshTokenRepoImpl(queryRunner)

        return refreshTokenRepo
    },
)

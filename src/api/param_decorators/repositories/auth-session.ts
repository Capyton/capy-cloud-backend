/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { AuthSessionRepoImpl } from "@src/infrastructure/db/repositories/auth-session"
import { QueryRunner } from "typeorm"
import { Request } from "express"

export const AuthSessionRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const refreshTokenRepo = new AuthSessionRepoImpl(queryRunner)

        return refreshTokenRepo
    },
)

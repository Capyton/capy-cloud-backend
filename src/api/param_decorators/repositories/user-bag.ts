import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UserBagReaderImpl, UserBagRepoImpl } from "@src/infrastructure/db/repositories"
import { QueryRunner } from "typeorm"

export const UserBagRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const userBag = new UserBagRepoImpl(queryRunner)

        return userBag
    }
)

export const UserBagReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const userBag = new UserBagReaderImpl(queryRunner)

        return userBag
    }
)

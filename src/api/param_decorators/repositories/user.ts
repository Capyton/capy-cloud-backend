import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UserReaderImpl, UserRepoImpl } from "@src/infrastructure/db/repositories"
import { QueryRunner } from "typeorm"

export const UserRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const user = new UserRepoImpl(queryRunner)

        return user
    }
)

export const UserReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const user = new UserReaderImpl(queryRunner)

        return user
    }
)

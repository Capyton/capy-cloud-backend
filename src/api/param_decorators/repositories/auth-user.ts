import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { AuthUserRepoImpl } from "@src/infrastructure/db/repositories"
import { QueryRunner } from "typeorm"

export const AuthUserRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const authUser = new AuthUserRepoImpl(queryRunner)

        return authUser
    }
)

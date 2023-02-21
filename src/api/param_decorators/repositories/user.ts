import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UserRepo } from "@src/infrastructure/db/repositories/user"
import { QueryRunner } from "typeorm"

export const User = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const user = new UserRepo(queryRunner)

        return user
    }
)

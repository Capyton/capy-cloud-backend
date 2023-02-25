import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { BagReaderImpl, BagRepoImpl } from "@src/infrastructure/db/repositories"
import { QueryRunner } from "typeorm"

export const BagRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const bag = new BagRepoImpl(queryRunner)

        return bag
    }
)

export const BagReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const bag = new BagReaderImpl(queryRunner)

        return bag
    }
)

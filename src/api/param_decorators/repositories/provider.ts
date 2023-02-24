import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { ProviderReaderImpl, ProviderRepoImpl } from "@src/infrastructure/db/repositories"
import { QueryRunner } from "typeorm"

export const ProviderRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const provider = new ProviderRepoImpl(queryRunner)

        return provider
    }
)

export const ProviderReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const provider = new ProviderReaderImpl(queryRunner)

        return provider
    }
)

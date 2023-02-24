import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { ProviderBagReaderImpl, ProviderBagRepoImpl } from "@src/infrastructure/db/repositories"
import { QueryRunner } from "typeorm"

export const ProviderBagRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const providerBag = new ProviderBagRepoImpl(queryRunner)

        return providerBag
    }
)

export const ProviderBagReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.queryRunner
        const providerBag = new ProviderBagReaderImpl(queryRunner)

        return providerBag
    }
)

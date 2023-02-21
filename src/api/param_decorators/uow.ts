import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UnitOfWork as BaseUnitOfWork } from "@src/application/common/interfaces"

export const UnitOfWork = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        // Get the `UnitOfWork` from the request, which was set in a database middleware
        const uow: BaseUnitOfWork = request.uow

        return uow
    }
)

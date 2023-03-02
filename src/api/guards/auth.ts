import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";

@Injectable()
export class Auth implements CanActivate {
    // TODO: Uncomment this when the @Inject(TON_CLIENT) decorator is implemented
    // construct(@Inject(TON_CLIENT) private tonClient: TonClient) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // TODO: Implement auth filter
        const userIsAuth = true

        return userIsAuth
    }
}

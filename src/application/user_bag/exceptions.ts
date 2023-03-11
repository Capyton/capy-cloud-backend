import { ApplicationException } from "../common/exceptions"

export class UserBagIdNotFound extends ApplicationException {
    constructor(cause?: Error, meatadata?: unknown) {
        super("User bag id not found", cause, meatadata)
    }
}

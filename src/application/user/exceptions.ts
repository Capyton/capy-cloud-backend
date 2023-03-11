import { ApplicationException } from "../common/exceptions"

export class UserAddressNotFound extends ApplicationException {
    constructor(cause?: Error, meatadata?: unknown) {
        super("User address not found", cause, meatadata)
    }
}

export class UserIdNotFound extends ApplicationException {
    constructor(cause?: Error, meatadata?: unknown) {
        super("User id not found", cause, meatadata)
    }
}

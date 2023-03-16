import { ApplicationException } from "../common/exceptions"

export class BagBagIdNotFound extends ApplicationException {
    constructor(cause?: Error, meatadata?: unknown) {
        super("Bag id not found", cause, meatadata)
    }
}

export class BagIdNotFound extends ApplicationException {
    constructor(cause?: Error, meatadata?: unknown) {
        super("Bag id not found", cause, meatadata)
    }
}

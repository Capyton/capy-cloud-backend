import { ApplicationException } from "../common/exceptions"

export class ProviderBagIdNotFound extends ApplicationException {
    constructor(cause?: Error, meatadata?: unknown) {
        super("Provider bag id not found", cause, meatadata)
    }
}

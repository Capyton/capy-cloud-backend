import { ApplicationException } from "../common/exceptions"

export class ProviderAddressNotFound extends ApplicationException {
    constructor(cause?: Error, meatadata?: unknown) {
        super("Provider address not found", cause, meatadata)
    }
}

export class ProviderIdNotFound extends ApplicationException {
    constructor(cause?: Error, meatadata?: unknown) {
        super("Provider id not found", cause, meatadata)
    }
}

export class GetProviderParamsByAddressError extends ApplicationException { }

export class NewContractMessageError extends ApplicationException { }

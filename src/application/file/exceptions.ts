import { ApplicationException } from "../common/exceptions"

export class FileIdNotFound extends ApplicationException {
    constructor(cause?: Error, meatadata?: unknown) {
        super("File id not found", cause, meatadata)
    }
}

import { UUID } from "@src/utils/uuid"


export class RefreshToken {
    constructor(
        public readonly id: UUID,
        public readonly token: string,
        public readonly userId: string,
        public readonly expiresAt: Date,
    ) { }
}

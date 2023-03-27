export class RefreshToken {
    constructor(
        readonly token: string,
        readonly expiresAt: Date,
    ) { }

    isExpired(): boolean {
        return this.expiresAt < new Date()
    }
}

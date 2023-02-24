export class Config {
    constructor(
        public readonly host: string = "localhost",
        public readonly port: number = 5432,
        public readonly user: string = "",
        public readonly password: string = "",
        public readonly database: string = "",
    ) { }
}

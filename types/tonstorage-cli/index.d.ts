type JSONResult = Record<string, any>

type CLIResult<T> = (
    { ok: true, result: T, code: 0 } |
    { ok: false, error: string, code: 400 } |
    { ok: false, error: "error: unknown error", code: 401 }
)

declare module "tonstorage-cli" {
    export default class TonstorageCLI {
        constructor(options: {
            bin: string,
            host: string,
            database: string,
            timeout: number,
        })

        /**
        * @param timeout - Default `TonstorageCLIOptions.timeout`
        */
        run(cmd: string, options?: {
            timeout?: number,
        }): Promise<{ stdout: string, stderr: string }>

        response(cmd: string): Promise<CLIResult<JSONResult>>

        list(): Promise<CLIResult<JSONResult>>

        get(index: string | number): Promise<CLIResult<JSONResult>>

        getPeers(index: string | number): Promise<CLIResult<JSONResult>>

        /**
         * @param upload - Default `true`
         * @param copy - Default `false`
         * @param description - Default `null`
         */
        create(path: string, options?: {
            upload: boolean,
            copy: boolean,
            description: string | null,
        }): Promise<CLIResult<JSONResult>>

        /**
         * @param download - Default `true`
         * @param upload - Default `true`
         * @param rootDir - Default `null`
         * @param partialFiles - Default `[]`
         */
        addByHash(hash: string, options?: {
            download: boolean,
            upload: boolean,
            rootDir: string | null,
            partialFiles: string[],
        }): Promise<CLIResult<JSONResult>>

        /**
         * @param download - Default `true`
         * @param upload - Default `true`
         * @param rootDir - Default `null`
         * @param partialFiles - Default `[]`
         */
        addByMeta(path: string, options?: {
            download: boolean,
            upload: boolean,
            rootDir: string | null,
            partialFiles: string[],
        }): Promise<CLIResult<JSONResult>>

        getMeta(
            index: string | number,
            path: string,
        ): Promise<CLIResult<{ message: "success", size: string | null }>>

        /**
         * @param removeFiles - Default `false`
         */
        remove(index: string | number, options?: {
            removeFiles: boolean,
        }): Promise<CLIResult<{ message: "success" }>>

        downloadPause(index: string | number): Promise<CLIResult<{ message: "success" }>>

        downloadResume(index: string | number): Promise<CLIResult<{ message: "success" }>>

        uploadPause(index: string | number): Promise<CLIResult<{ message: "success" }>>

        uploadResume(index: string | number): Promise<CLIResult<{ message: "success" }>>

        priorityAll(
            index: string | number,
            priority: number,
        ): Promise<CLIResult<{ message: "success" }>>

        priorityName(
            index: string | number,
            name: string,
            priority: number,
        ): Promise<CLIResult<{ message: "success" }>>

        priorityIdx(
            index: string | number,
            fileId: number,
            priority: number,
        ): Promise<CLIResult<{ message: "success" }>>

        deployProvider(): Promise<CLIResult<{
            address: string | null,
            nonBounceableAddress: string | null,
        }>>

        /**
         * @param contracts - Default `true`
         * @param  balances - Default `true`
         */
        getProviderInfo(options?: {
            contracts: boolean,
            balances: boolean,
        }): Promise<CLIResult<JSONResult>>

        setProviderConfig(
            maxContracts: number,
            maxTotalSize: number,
        ): Promise<CLIResult<{ message: "success" }>>

        setProviderParams(
            accept: 0 | 1,
            rate: number,
            maxSpan: number,
            minFileSize: number,
            maxFileSize: number,
        ): Promise<CLIResult<{ message: "success" }>>

        getProviderParams(providerAddress: string | null): Promise<CLIResult<JSONResult>>

        newContractMessage(
            torrent: string,
            queryId: string,
            providerAddress: string,
        ): Promise<CLIResult<{
            payload: string,
            rate: number | null,
            maxSpan: number | null,
        }>>

        closeContract(address: string): Promise<CLIResult<{ message: "success" }>>

        withdraw(address: string): Promise<CLIResult<{ message: "success" }>>

        withdrawAll(): Promise<CLIResult<{ message: "success" }>>

        sendCoins(
            address: string,
            amount: number,
            options?: {
                message: string | null,
            },
        ): Promise<CLIResult<{ message: "success" }>>
    }
}

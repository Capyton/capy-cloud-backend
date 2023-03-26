import axios, { AxiosInstance, AxiosResponse } from "axios"
import { TonApiClient } from "@src/application/auth/interfaces/auth-manager"
import { TonNetwork } from "@src/domain/user/types"


export class TonApiClientImpl implements TonApiClient {
    private readonly client: AxiosInstance

    constructor() {
        this.client = axios.create()
    }

    async getPubKey(address: string, chain: TonNetwork = TonNetwork.Mainnet): Promise<string> {
        const networkPreffix = chain === TonNetwork.Testnet ? "testnet." : ""
        const response: AxiosResponse<{ publicKey: string }> = await this.client.get(
            `https://${networkPreffix}tonapi.io/v1/wallet/getWalletPublicKey?account=${encodeURI(address)}`,
        )
        // TODO: handle the case when response data is {"error":"wallet is not initialized"}
        if (response.status !== 200) {
            throw new Error(`TON API returned status ${response.status}`)
        }
        const pubKey = response.data.publicKey
        return pubKey
    }
}

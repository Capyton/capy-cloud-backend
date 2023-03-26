import { createHash } from "crypto"
import nacl from "tweetnacl"


// Copied from this gist https://gist.github.com/TrueCarry/cac00bfae051f7028085aa018c2a05c6

interface Domain {
    lengthBytes: number // uint32 `json:"lengthBytes"`
    value: string // string `json:"value"`
}

interface ParsedMessage {
    workChain: number // int32
    address: Buffer // []byte
    timestamp: number // int64
    domain: Domain // Domain
    signature: Buffer // []byte
    payload: string // string
    stateInit: string // string
}

export function signatureVerify(
    pubkey: Buffer,
    message: Buffer,
    signature: Buffer,
): boolean {
    return nacl.sign.detached.verify(message, signature, pubkey)

    // return ed25519.Verify(pubkey, message, signature)
}

const tonProofPrefix = "ton-proof-item-v2/"
const tonConnectPrefix = "ton-connect"

export function createMessage(message: ParsedMessage): Buffer {
    // wc := make([]byte, 4)
    // binary.BigEndian.PutUint32(wc, uint32(message.Workchain))

    const wc = Buffer.alloc(4)
    wc.writeUint32BE(message.workChain)

    // ts := make([]byte, 8)
    // binary.LittleEndian.PutUint64(ts, uint64(message.Timstamp))

    const ts = Buffer.alloc(8)
    ts.writeBigUint64LE(BigInt(message.timestamp))

    // dl := make([]byte, 4)
    // binary.LittleEndian.PutUint32(dl, message.Domain.LengthBytes)
    const dl = Buffer.alloc(4)
    dl.writeUint32LE(message.domain.lengthBytes)

    const m = Buffer.concat([
        Buffer.from(tonProofPrefix),
        wc,
        message.address,
        dl,
        Buffer.from(message.domain.value),
        ts,
        Buffer.from(message.payload),
    ])

    // const messageHash =  //sha256.Sum256(m)
    // const messageHash = await crypto.subtle.digest('SHA-256', m)
    // const m = Buffer.from(tonProofPrefix)
    // m.write(ts)

    // m := []byte(tonProofPrefix)
    // m = append(m, wc...)
    // m = append(m, message.Address...)
    // m = append(m, dl...)
    // m = append(m, []byte(message.Domain.Value)...)
    // m = append(m, ts...)
    // m = append(m, []byte(message.Payload)...)

    const messageHash = createHash("sha256").update(m).digest()

    const fullMes = Buffer.concat([
        Buffer.from([0xff, 0xff]),
        Buffer.from(tonConnectPrefix),
        Buffer.from(messageHash),
    ])
    // []byte{0xff, 0xff}
    // fullMes = append(fullMes, []byte(tonConnectPrefix)...)
    // fullMes = append(fullMes, messageHash[:]...)

    // const res = await crypto.subtle.digest('SHA-256', fullMes)
    const res = createHash("sha256").update(fullMes).digest()
    return Buffer.from(res)
}

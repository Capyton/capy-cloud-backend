import * as base64 from "base64-js"

export function hexEncodeFromBytes(bytes: Uint8Array): string {
    const hexCodes: string[] = []
    for (const code of bytes) {
        const hexCode = code.toString(16)
        const paddedHexCode = hexCode.padStart(2, "0")
        hexCodes.push(paddedHexCode)
    }
    return hexCodes.join("").toUpperCase()
}

export function hexEncodeFromString(str: string): string {
    const bytes = base64.toByteArray(str)

    return hexEncodeFromBytes(bytes)
}

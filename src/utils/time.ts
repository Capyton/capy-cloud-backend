// A function to stop an async thread for a few miliseconds
export function sleep(ms: number): Promise<() => void> {
    return new Promise(
        resolve => setTimeout(resolve as () => void, ms),
    )
}

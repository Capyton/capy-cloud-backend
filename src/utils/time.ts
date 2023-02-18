// A function to stop an async thread for a few miliseconds
export function sleep(ms: number): Promise<Function> {
  return new Promise(resolve => setTimeout(resolve as any, ms));
}

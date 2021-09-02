export default function sleep(ms: number) {
    return new Promise<never>(resolve => setTimeout(resolve, ms))
}

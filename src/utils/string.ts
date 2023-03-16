export function trim(str: string, characters: string) {
    let start = 0
    while (characters.indexOf(str[start]) !== -1) {
        start += 1
    }
    let end = str.length - 1
    while (characters.indexOf(str[end]) !== -1) {
        end -= 1
    }
    return str.slice(start, end + 1)
}

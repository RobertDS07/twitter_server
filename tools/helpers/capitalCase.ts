export const name = `capitalCase`

export const helperFunction = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const name = `snakeCase`

export const helperFunction = (text: string): string => {
    const reg = new RegExp(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
    )

    const arryWithMatchedPattern = text.match(reg) as string[]

    const formattedText = arryWithMatchedPattern
        .map(part => part.toLowerCase())
        .join(`_`)

    return formattedText
}

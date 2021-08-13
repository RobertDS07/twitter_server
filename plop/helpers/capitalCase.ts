const name = `capitalCase`

const helperFunction = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export { name, helperFunction }

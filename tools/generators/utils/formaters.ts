export const routePathFormater = (path: string): string => {
    const pathHasBar = path.startsWith(`/`)

    const formattedPath = pathHasBar ? path.slice(1) : path

    return formattedPath
}

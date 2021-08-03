interface IAuthenticationHeader {
    Authorization: string
}

export default function createAuthorization(
    token: string,
): IAuthenticationHeader {
    return {
        Authorization: `Bearer ${token}`,
    }
}

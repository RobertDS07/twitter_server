import jwt from 'jsonwebtoken'

interface jwtDecoded {
    user: {
        id: number
        name: string
        email: string
    }
}

const verifyToken = (token: string): Promise<jwtDecoded> => {
    return new Promise<jwtDecoded>((res, rej) => {
        jwt.verify(
            token,
            process.env.SECRET || 'qeoqwi3432fh',
            (err, decoded) => {
                if (err) rej()

                res((decoded as unknown) as jwtDecoded)
            },
        )
    })
}

export default verifyToken

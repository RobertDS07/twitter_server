import jwt from 'jsonwebtoken'

const verifyToken = <T>(token: string): Promise<T> => {
    return new Promise<T>(res => {
        jwt.verify(
            token,
            process.env.SECRET || 'qeoqwi3432fh',
            (err, decoded) => {
                if (err) res()

                res((decoded as unknown) as T)
            },
        )
    })
}

export default verifyToken

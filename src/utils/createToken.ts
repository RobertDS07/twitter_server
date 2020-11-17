import jwt from 'jsonwebtoken'

const createToken = <T>(user: T): string => {
    return jwt.sign({ user }, process.env.SECRET || 'qeoqwi3432fh', {
        expiresIn: '365d',
    })
}

export default createToken

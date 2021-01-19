import jwt from 'jsonwebtoken'

export interface response {
    token: string
    user: string
}

interface user {
    name: string
}

const createToken = <T extends user>(user: T): response => {
    const token = jwt.sign({ user }, process.env.SECRET || 'qeoqwi3432fh', {
        expiresIn: '365d',
    })

    const response = { token, user: user.name }

    return response
}

export default createToken

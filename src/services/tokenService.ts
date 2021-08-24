/* eslint-disable @typescript-eslint/no-var-requires */
import jwt, { JwtPayload } from 'jsonwebtoken'

import { IUser } from 'models/Users'
import CustomError from 'errors/CustomError'

const { secret, expiresIn } = require(`../../configs/token.js`)

interface IDecodedToken extends JwtPayload, IUser {}

class TokenService {
    createToken = (user: IUser): string => {
        const userWithoutPassword = { ...user, password: undefined }

        const token = jwt.sign(userWithoutPassword, secret, {
            expiresIn,
        })

        return token
    }

    decodeToken = (token: string): IDecodedToken => {
        const decodedToken = jwt.decode(token) as IDecodedToken | null

        if (!decodedToken)
            throw new CustomError(`Invalid Credentials`).AccessDenied()

        if (decodedToken && decodedToken.password) delete decodedToken.password

        return decodedToken as IDecodedToken
    }
}

export default new TokenService()

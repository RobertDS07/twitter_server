/* eslint-disable @typescript-eslint/no-var-requires */
import jwt, { JwtPayload } from 'jsonwebtoken'

import CustomError from 'errors/CustomError'

import { IUser } from 'models/Users'

import IUserWithoutPassword from 'src/interfaces/userWhithoutPassword'

const { secret, expiresIn } = require(`../../configs/token.js`)

export interface IDecodedToken extends JwtPayload, IUserWithoutPassword {}

class TokenService {
    createToken = (user: IUser | IUserWithoutPassword): string => {
        const userWithoutPassword = { ...user, password: undefined }

        const token = jwt.sign(userWithoutPassword, secret, {
            expiresIn,
        })

        return token
    }

    decodeToken = (token = ``): IDecodedToken => {
        const decodedToken = jwt.decode(token) as IDecodedToken | null

        if (!decodedToken)
            throw new CustomError(`Invalid Credentials`).accessDenied()

        return decodedToken as IDecodedToken
    }
}

export default new TokenService()

import bcrypt from 'bcryptjs'

import { IUser } from 'models/Users'

import UsersRepository from 'repositories/UsersRepository'

import CustomError from 'errors/CustomError'

type TGetUser = Required<Pick<IUser, `email` | `password`>>

class AuthenticationService {
    async verifyAndGetUser({ email, password }: TGetUser): Promise<IUser> {
        const user = await UsersRepository.getByEmail(email)

        const invalidPassword =
            user && !bcrypt.compare(password, user?.password)

        if (!user || invalidPassword)
            throw new CustomError(`Invalid email or password`).AccessDenied()

        const userWithoutPassword = { ...user, password: undefined }

        return userWithoutPassword
    }
}

export default new AuthenticationService()

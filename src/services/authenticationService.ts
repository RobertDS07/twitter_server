import bcrypt from 'bcryptjs'

import Users, { IUser } from 'models/Users'

import UsersRepository from 'repositories/UsersRepository'

import CustomError from 'errors/CustomError'

import IUserWithoutPassword from 'src/interfaces/userWhithoutPassword'

type TPropsGetUser = Pick<IUser, `email` | `password`>

class AuthenticationService {
    async verifyAndGetUser({
        email,
        password,
    }: TPropsGetUser): Promise<IUserWithoutPassword> {
        const user = await UsersRepository.getByEmail(email, true)

        const invalidUser =
            !user || !(await bcrypt.compare(password, user?.password))

        if (invalidUser)
            throw new CustomError(`Invalid email or password`).accessDenied()

        const userWithoutPassword = {
            ...user,
            password: undefined,
        }

        return userWithoutPassword
    }
}

export default new AuthenticationService()

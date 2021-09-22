/* eslint-disable @typescript-eslint/no-var-requires */
import bcrypt from 'bcryptjs'

import { ModelCtor } from 'sequelize/types'

import BaseRepository from './_baseClassRepository'

import Users, { IUser } from 'models/Users'

import { verifyEmail } from 'utils/validations'
import CustomError from 'errors/CustomError'

import IUserWithoutPassword from 'src/interfaces/userWhithoutPassword'

export type TPropsCreateUser = Pick<IUser, `password` | `email` | `username`>

class UsersRepository extends BaseRepository<IUser> {
    constructor(model: ModelCtor<IUser>) {
        super(model)
    }

    async create({
        email,
        password,
        username,
    }: TPropsCreateUser): Promise<IUserWithoutPassword> {
        const isEmail = verifyEmail(email)
        const weakPassword = password.length < 4

        if (weakPassword)
            throw new CustomError(`Weak Password`).businessException()

        if (!isEmail) throw new CustomError(`Invalid Email`).businessException()

        const hashedPassword = await bcrypt.hash(password, 10)

        const { total } = await super.find({ where: { email } })

        const isntNew = total > 0

        if (isntNew) throw new CustomError(`Email in use`).conflict()

        const dataToCreateUser = {
            email,
            username,
            password: hashedPassword,
        }

        const createdUser = await super.create(dataToCreateUser)

        const userWithoutPassword = {
            ...createdUser,
            password: undefined,
        }

        return userWithoutPassword
    }

    async getByEmail(
        email: string,
        withPassword?: boolean,
    ): Promise<IUser | null> {
        const filter = { email }

        const data = withPassword
            ? await this.model.scope(`withPassword`).findAll({ where: filter })
            : this.model.findAll({ where: filter })

        return data[0]
    }
}

export default new UsersRepository(Users)

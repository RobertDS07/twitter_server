/* eslint-disable @typescript-eslint/no-var-requires */
import bcrypt from 'bcryptjs'

import { ModelCtor } from 'sequelize/types'

import Users, { IUser } from 'models/Users'

import verifyEmail from 'utils/verifyEmail'
import CustomError from 'errors/CustomError'

export type TPropsCreateUser = Required<
    Pick<IUser, `password` | `email` | `username`>
>

class UsersRepository {
    model: ModelCtor<IUser>

    constructor(model: ModelCtor<IUser>) {
        this.model = model
    }

    create = async ({
        email,
        password,
        username,
    }: TPropsCreateUser): Promise<IUser> => {
        const isEmail = verifyEmail(email)
        const weakPassword = password.length < 4

        if (weakPassword)
            throw new CustomError(`Weak Password`).businessException()

        if (!isEmail) throw new CustomError(`Invalid Email`).businessException()

        const hashedPassword = await bcrypt.hash(password, 10)

        const [newUser, isNew] = await this.model.findOrCreate({
            where: { email },
            defaults: {
                password: hashedPassword,
                username,
            },
        })

        if (!isNew) throw new CustomError(`Email in use`).businessException()

        //TODO: ENCONTRAR UM MODO DE NÃO PRECISAR UTILIZA O .toJSON()
        const userWithoutPassword = {
            ...newUser.toJSON(),
            password: undefined,
        } as IUser

        return userWithoutPassword
    }

    async getByEmail(email: string): Promise<Required<IUser> | null> {
        const user = await this.model.findAll({
            where: {
                email,
            },
        })

        return user[0] as Required<IUser>
    }
}

export default new UsersRepository(Users)

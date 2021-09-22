import faker from 'faker'

import UsersRepository, {
    TPropsCreateUser,
} from '../../src/repositories/UsersRepository'

import { IUser } from '../../src/models/Users'

import tokenService from '../../src/services/tokenService'

import IUserWithoutPassword from '../../src/interfaces/userWhithoutPassword'

interface IReturn {
    user: IUser | IUserWithoutPassword
    rawData: TPropsCreateUser
    token: string
}

export default async function createUser(
    includePassword = false,
): Promise<IReturn> {
    const dataToCreateUser = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
    }

    const user = await UsersRepository.create(dataToCreateUser)

    const token = tokenService.createToken(user)

    return {
        token,
        rawData: dataToCreateUser,
        user: {
            ...user,
            password: includePassword ? dataToCreateUser.password : undefined,
        },
    }
}

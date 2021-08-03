import faker from 'faker'

import UsersRepository, {
    TPropsCreateUser,
} from '../../src/repositories/UsersRepository'

import Users, { IUser } from '../../src/models/Users'
import tokenService from '../../src/services/tokenService'

interface IReturn {
    user: IUser | Required<IUser>
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

    const user = includePassword
        ? ((await Users.create(dataToCreateUser)).toJSON() as Required<IUser>)
        : ((await UsersRepository.create(dataToCreateUser)) as IUser)

    const token = tokenService.createToken(user)

    return { user, rawData: dataToCreateUser, token }
}

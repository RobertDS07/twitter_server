import { TUserAttributes } from 'models/Users'

export default interface IUserWithoutPassword
    extends Omit<TUserAttributes, `password`> {
    password?: string
}

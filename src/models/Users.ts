import { DataTypes, Model } from 'sequelize'

import ITimestamps from '../interfaces/timestamps'

import sequelize from '../sequelize'

export interface IUser extends Model, ITimestamps {
    id: number
    email: string
    username: string
    password: string
}

export type TUserAttributes = IUser[`_attributes`]

const Users = sequelize.define<IUser>(
    `users`,
    {
        email: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        defaultScope: {
            attributes: {
                exclude: [`password`],
            },
        },
        scopes: {
            withPassword: {
                attributes: {
                    exclude: [],
                },
            },
        },
    },
)

export default Users

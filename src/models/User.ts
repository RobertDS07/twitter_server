import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcryptjs'

import sequelize from '../database/index'

import { post } from './Post'

export interface user extends Model {
    email: string
    password: string
    name: string
    id: number
    posts?: post[]
}

const User = sequelize.define<user>(
    'users',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Email inválido',
                },
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 40],
                    msg: 'Mínimo 5 caracteres',
                },
            },
        },
    },
    {
        hooks: {
            beforeSave: async (user: user) => {
                user.password = await bcrypt.hash(user.password, 10)
                user.name = user.name.trim()
            },
        },
    },
)

export default User

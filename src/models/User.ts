import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcryptjs'

import sequelize from '../database/index'

interface user extends Model {
    email: string
    password: string
    name: string
    id: number
    post?: {
        content: string
    }
}

const User = sequelize.define(
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
        },
    },
    {
        hooks: {
            beforeSave: async (user: user) => {
                user.password = await bcrypt.hash(user.password, 10)
            },
        },
    },
)

export default User

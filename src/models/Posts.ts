import { DataTypes, Model } from 'sequelize'

import ITimestamps from '../interfaces/timestamps'

import sequelize from '../sequelize'

import Users, { IUser } from './Users'

export interface IPost extends Model, ITimestamps {
    id: number
    userId: number
    content: string

    user: IUser
}

const Posts = sequelize.define<IPost>(`posts`, {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Posts.belongsTo(Users, { foreignKey: `userId`, as: `user` })
Users.hasMany(Posts)

export default Posts

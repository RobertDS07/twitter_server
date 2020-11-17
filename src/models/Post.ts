import { DataTypes, Model } from 'sequelize'

import sequelize from '../database'
import User from './User'

export interface post extends Model {
    content: string
    userId: number
    mutable: boolean
    user: {
        name: string
    }
    coments: {
        mutable: boolean
        content: string
        userId: number
        id: number
        user: {
            name: string
        }
    }[]
}

const Post = sequelize.define<post>('posts', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Post.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Post, { foreignKey: 'userId' })

export default Post

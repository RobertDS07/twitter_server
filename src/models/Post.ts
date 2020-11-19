import { DataTypes, Model } from 'sequelize'

import sequelize from '../database'

import User from './User'
import { Comment } from './Coment'

export interface post extends Model {
    id: number
    content: string
    userId: number
    mutable?: boolean
    user: {
        name: string
    }
    coments: Comment[]
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

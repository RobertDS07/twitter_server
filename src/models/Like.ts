import { Model } from 'sequelize/types'

import sequelize from '../database'

import Post from './Post'
import User from './User'

interface like extends Model {
    id: number
    postId: number
    userId: number
}

const Like = sequelize.define<like>('likes', {})

Like.belongsTo(User, { foreignKey: 'userId' })
Like.belongsTo(Post, { foreignKey: 'postId' })
Post.hasMany(Like, { foreignKey: 'postId' })
User.hasMany(Like, { foreignKey: 'userId' })

export default Like

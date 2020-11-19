import { DataTypes, Model } from 'sequelize'

import sequelize from '../database'
import Post from './Post'
import User, { user } from './User'

export interface Comment extends Model {
    content: string
    mutable?: boolean
    user: user[]
    userId: number
    id: number
}

const Coment = sequelize.define<Comment>('coments', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Coment.belongsTo(Post, { foreignKey: 'postId' })
Coment.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Coment, { foreignKey: 'userId' })
Post.hasMany(Coment, { foreignKey: 'postId' })

export default Coment

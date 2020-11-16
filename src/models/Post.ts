import { DataTypes } from 'sequelize'

import sequelize from '../database'
import User from './User'

const Post = sequelize.define('posts', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Post.belongsTo(User, { foreignKey: 'id' })
User.hasMany(Post, { foreignKey: 'id' })

export default Post

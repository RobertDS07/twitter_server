import { DataTypes } from 'sequelize'

import sequelize from '../database'
import Post from './Post'
import User from './User'

const Coment = sequelize.define('coments', {
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

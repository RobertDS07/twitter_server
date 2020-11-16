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

Coment.belongsTo(Post, { foreignKey: 'id' })
Coment.belongsTo(User, { foreignKey: 'id' })
User.hasMany(Coment, { foreignKey: 'id' })
Post.hasMany(Coment, { foreignKey: 'id' })

export default Coment

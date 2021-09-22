'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        created_at: {
          type: 'TIMESTAMP',
          allowNull: false,
          defaultValue: Sequelize.NOW
      },
        updated_at: {
          type: 'TIMESTAMP',
          allowNull: false,
          defaultValue: Sequelize.NOW
      },
        deleted_at: {
          type: 'TIMESTAMP',
        },
        
        email: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
          unique: true
        },
        username: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false
        },
        password: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false
        },
      })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users')
    },
}

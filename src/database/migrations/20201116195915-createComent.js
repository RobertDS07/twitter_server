'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('coments', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            postId: {
                type: Sequelize.INTEGER,
                references: { model: 'posts', key: 'id' },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        })
    },

    down: async queryInterface => {
        await queryInterface.dropTable('coments')
    },
}

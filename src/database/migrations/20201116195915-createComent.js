'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('coments', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
                references: { model: 'posts', references: 'id' },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            usarId: {
                type: Sequelize.INTEGER,
                references: { model: 'users', references: 'id' },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        })
    },

    down: async queryInterface => {
        await queryInterface.dropTable('coments')
    },
}

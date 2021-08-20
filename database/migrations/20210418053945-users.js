'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
          CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            deleted_at TIMESTAMP,

            email TEXT UNIQUE NOT NULL,
            username TEXT NOT NULL,
            password TEXT NOT NULL CHECK (CHAR_LENGTH(password) >= 4)
          )
        `)
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
          DROP TABLE IF EXISTS users
        `)
    },
}

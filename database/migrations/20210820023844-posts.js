'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.Sequelize.query(`
      CREATE TABLE IF NOT EXISTS posts(
        id SERIAL PRIMARY KEY,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP,

        content TEXT NOT NULL
      )
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.Sequelize.query(`
      DROP TABLE IF EXISTS posts
    `)
  }
};

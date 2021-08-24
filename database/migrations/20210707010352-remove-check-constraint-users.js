'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      DROP CONSTRAINT users_password_check
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      ADD CHECK (char_length(password) >= 4)
    `)
  }
};

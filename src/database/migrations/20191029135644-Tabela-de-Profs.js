'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      disciplina: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('profs');
  }
};

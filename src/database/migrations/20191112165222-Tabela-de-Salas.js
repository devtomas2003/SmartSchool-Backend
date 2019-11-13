'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('salas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      sala: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expirationTime:{
        type: Sequelize.DATE,
        allowNull: true
      },
      ativo: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('salas');
  }
};

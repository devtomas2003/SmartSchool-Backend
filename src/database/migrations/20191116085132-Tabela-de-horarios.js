'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Horarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Horarios');
  }
};

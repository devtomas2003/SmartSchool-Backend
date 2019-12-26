'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Utilizadores',
      'recuperated',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Utilizadores', 'recuperated')
  }
};

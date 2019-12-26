'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Utilizadores',
      'firstAccess',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Utilizadores', 'firstAccess')
  }
};

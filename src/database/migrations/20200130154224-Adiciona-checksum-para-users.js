'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Utilizadores',
      'checksum',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'BBB'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Utilizadores', 'checksum')
  }
};

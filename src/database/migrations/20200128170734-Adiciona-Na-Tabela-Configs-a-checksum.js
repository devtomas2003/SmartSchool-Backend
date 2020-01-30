'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'versions',
      'tablesChecksum',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'AAA'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('versions', 'tablesChecksum')
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Utilizadores',
      'procNumber'
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Utilizadores', 'procNumber',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
  }
};

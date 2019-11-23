'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SalasHorarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idSala: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Salas',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      idHorario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Horarios',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('SalasHorarios');
  }
};

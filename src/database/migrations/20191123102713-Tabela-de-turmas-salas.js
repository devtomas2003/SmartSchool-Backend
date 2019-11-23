'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TurmasSalas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idTurma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Turmas',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
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
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('TurmasSalas');
  }
};

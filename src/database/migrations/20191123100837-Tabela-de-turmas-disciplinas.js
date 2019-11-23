'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TurmasDisciplinas', {
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
      idDisciplina: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Disciplinas',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('TurmasDisciplinas');
  }
};

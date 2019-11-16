'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('salasDisciplinas', {
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
          model: 'salas',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      idDisciplina: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'disciplinas',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('salasDisciplinas');
  }
};

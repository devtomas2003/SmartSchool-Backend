'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProfsDisciplinas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idProf: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Profs',
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
      return queryInterface.dropTable('ProfsDisciplinas');
  }
};

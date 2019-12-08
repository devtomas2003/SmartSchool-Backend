'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tempos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idHora: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Horarios',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      idSala:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Salas',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      idDia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'DiasDaSemana',
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
      idTurma:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Turmas',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      ativa: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Tempos');
  }
};

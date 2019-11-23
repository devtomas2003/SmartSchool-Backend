'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TurmasProfs', {
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
    idTurma: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Turmas',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }
  });
},
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('TurmasProfs');
  }
};

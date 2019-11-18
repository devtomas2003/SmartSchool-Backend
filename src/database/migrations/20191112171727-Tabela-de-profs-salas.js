'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profsSalas', {
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
        model: 'salas',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    idSala: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Profs',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }
  });
},
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('profsSalas');
  }
};

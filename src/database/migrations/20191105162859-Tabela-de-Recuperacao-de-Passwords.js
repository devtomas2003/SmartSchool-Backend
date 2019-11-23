'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RecuperationPass', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Utilizadores',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      expirationTime:{
        type: Sequelize.DATE,
        allowNull: true
      },
      ativo: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('RecuperationPass');
  }
};

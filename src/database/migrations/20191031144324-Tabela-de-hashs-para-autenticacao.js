'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('auth_users', {
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
          model: 'utilizadores',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      expirationTime:{
        type: Sequelize.DATE,
        allowNull: true
      },
      device: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('auth_users');
  }
};

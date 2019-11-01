'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('utilizadores', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        procNumber: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        turma: {
          type: Sequelize.STRING,
          allowNull: false
        },
        foto: {
          type: Sequelize.STRING,
          allowNull: false
        },
        ativo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('utilizadores');
  }
};

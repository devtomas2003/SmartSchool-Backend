'use strict';
module.exports = (sequelize, DataTypes) => {
    const auth_users = sequelize.define('auth_users', {
        nome: DataTypes.STRING,
        disciplina: DataTypes.INTEGER
    });
    auth_users.associate = function(models) {
        auth_users.belongsTo(models.utilizadores, { foreignKey: 'idUser', as: 'userrelation' });
    }
    return auth_users;
};
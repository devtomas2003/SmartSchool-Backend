'use strict';
module.exports = (sequelize, DataTypes) => {
    const auth_users = sequelize.define('auth_users', {
        hash: DataTypes.STRING,
        expirationTime: DataTypes.DATE,
        device: DataTypes.STRING
    });
    auth_users.associate = function(models) {
        auth_users.belongsTo(models.utilizadores, { foreignKey: 'idUser', as: 'userrelation' });
    }
    return auth_users;
};
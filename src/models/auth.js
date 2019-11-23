'use strict';
module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define('Auth', {
        hash: DataTypes.STRING,
        expirationTime: DataTypes.DATE,
        device: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Auth'
    });
    Auth.associate = function(models) {
        Auth.belongsTo(models.Utilizadores, { foreignKey: 'idUser', as: 'userrelation' });
    }
    return Auth;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
    const RecuperationPass = sequelize.define('RecuperationPass', {
        hash: DataTypes.STRING,
        expirationTime: DataTypes.DATE,
        ativo: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'RecuperationPass'
    });
    RecuperationPass.associate = function(models) {
        RecuperationPass.belongsTo(models.Utilizadores, { foreignKey: 'idUser', as: 'userrelation' });
    }
    return RecuperationPass;
};
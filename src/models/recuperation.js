'use strict';
module.exports = (sequelize, DataTypes) => {
    const recuperationPass = sequelize.define('recuperationPass', {
        hash: DataTypes.STRING,
        expirationTime: DataTypes.DATE,
        ativo: DataTypes.INTEGER
    });
    recuperationPass.associate = function(models) {
        recuperationPass.belongsTo(models.utilizadores, { foreignKey: 'idUser', as: 'userrelation' });
    }
    return recuperationPass;
};
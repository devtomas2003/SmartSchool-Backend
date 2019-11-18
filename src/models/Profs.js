'use strict';
module.exports = (sequelize, DataTypes) => {
    const profs = sequelize.define('profs', {
        nome: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'profs'
    });
    profs.associate = function(models) {
        profs.belongsToMany(models.salas, { foreignKey: 'idProf', through: 'profsSalas', as: 'profsSalasum' });
        profs.belongsToMany(models.disciplinas, { foreignKey: 'idProf', through: 'profsDisciplinas', as: 'disciplinasProfsdois' });
    }
    return profs;
};
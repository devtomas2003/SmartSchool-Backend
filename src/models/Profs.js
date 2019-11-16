'use strict';
module.exports = (sequelize, DataTypes) => {
    const profs = sequelize.define('profs', {
        nome: DataTypes.STRING
    });
    profs.associate = function(models) {
        profs.belongsToMany(models.salas, { foreignKey: 'idProf', through: 'profsSalas', as: 'profsSalas' });
        profs.belongsToMany(models.disciplinas, { foreignKey: 'idProf', through: 'profsDisciplinas', as: 'profsDisciplinas' });
    }
    return profs;
};
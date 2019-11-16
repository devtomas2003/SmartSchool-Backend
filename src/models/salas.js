'use strict';
module.exports = (sequelize, DataTypes) => {
    const salas = sequelize.define('salas', {
        sala: DataTypes.STRING,
        hash: DataTypes.STRING
    });
    salas.associate = function(models) {
        salas.belongsToMany(models.Profs, { foreignKey: 'idSala', through: 'profsSalas', as: 'salasProfs' });
        salas.belongsToMany(models.disciplinas, { foreignKey: 'idSala', through: 'salasDisciplinas', as: 'salasDisciplinas' });
        salas.belongsToMany(models.horarios, { foreignKey: 'idSala', through: 'salasHorarios', as: 'salasHorarios' });
        salas.belongsToMany(models.diasDaSemana, { foreignKey: 'idSala', through: 'diasSalas', as: 'salasDias' });
    }
    return salas;
};
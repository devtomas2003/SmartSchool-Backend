'use strict';
module.exports = (sequelize, DataTypes) => {
    const salas = sequelize.define('salas', {
        sala: DataTypes.STRING,
        hash: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'salas'
    });
    salas.associate = function(models) {
        salas.belongsToMany(models.Profs, { foreignKey: 'idSala', through: 'profsSalas', as: 'profsSalasdois' });
        salas.belongsToMany(models.disciplinas, { foreignKey: 'idSala', through: 'salasDisciplinas', as: 'salasDisciplinasum' });
        salas.belongsToMany(models.horarios, { foreignKey: 'idSala', through: 'salasHorarios', as: 'salasHorariosum' });
        salas.belongsToMany(models.diasDaSemana, { foreignKey: 'idSala', through: 'diasSalas', as: 'diasSalasdois' });
    }
    return salas;
};
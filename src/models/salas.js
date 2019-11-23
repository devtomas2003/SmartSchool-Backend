'use strict';
module.exports = (sequelize, DataTypes) => {
    const Salas = sequelize.define('Salas', {
        sala: DataTypes.STRING,
        hash: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Salas'
    });
    Salas.associate = function(models) {
        Salas.belongsToMany(models.Profs, { foreignKey: 'idSala', through: 'ProfsSalas', as: 'profsSalasdois' });
        Salas.belongsToMany(models.Disciplinas, { foreignKey: 'idSala', through: 'SalasDisciplinas', as: 'salasDisciplinasum' });
        Salas.belongsToMany(models.Horarios, { foreignKey: 'idSala', through: 'SalasHorarios', as: 'salasHorariosum' });
        Salas.belongsToMany(models.DiasDaSemana, { foreignKey: 'idSala', through: 'DiasSalas', as: 'diasSalasdois' });
        Salas.belongsToMany(models.Turmas, { foreignKey: 'idSala', through: 'TurmasSalas', as: 'turmasSalasdois' });
    }
    return Salas;
};
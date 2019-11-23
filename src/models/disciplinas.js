'use strict';
module.exports = (sequelize, DataTypes) => {
    const Disciplinas = sequelize.define('Disciplinas', {
        disciplina: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Disciplinas'
    });
    Disciplinas.associate = function(models) {
        Disciplinas.belongsToMany(models.Profs, { foreignKey: 'idDisciplina', through: 'ProfsDisciplinas', as: 'disciplinasProfsum' });
        Disciplinas.belongsToMany(models.Salas, { foreignKey: 'idDisciplina', through: 'SalasDisciplinas', as: 'salasDisciplinasdois' });
        Disciplinas.belongsToMany(models.Turmas, { foreignKey: 'idDisciplina', through: 'TurmasDisciplinas', as: 'turmasDisciplinasdois' });
    }
    return Disciplinas;
};
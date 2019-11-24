'use strict';
module.exports = (sequelize, DataTypes) => {
    const Disciplinas = sequelize.define('Disciplinas', {
        disciplina: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Disciplinas'
    });
    Disciplinas.associate = function(models) {
        Disciplinas.belongsToMany(models.Profs, { foreignKey: 'idDisciplina', through: 'ProfsDisciplinas', as: 'Disciplinasprofs' });
        Disciplinas.belongsToMany(models.Salas, { foreignKey: 'idDisciplina', through: 'SalasDisciplinas', as: 'salasDisciplinas' });
        Disciplinas.belongsToMany(models.Turmas, { foreignKey: 'idDisciplina', through: 'TurmasDisciplinas', as: 'turmasDisciplinas' });
    }
    return Disciplinas;
};
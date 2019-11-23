'use strict';
module.exports = (sequelize, DataTypes) => {
    const Turmas = sequelize.define('Turmas', {
        turma: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Turmas'
    });
    Turmas.associate = function(models) {
        Turmas.belongsToMany(models.Profs, { foreignKey: 'idTurma', through: 'TurmasProfs', as: 'turmasProfsum' });
        Turmas.belongsToMany(models.Disciplinas, { foreignKey: 'idTurma', through: 'TurmasDisciplinas', as: 'turmasDisciplinasum' });
        Turmas.belongsToMany(models.Salas, { foreignKey: 'idTurma', through: 'TurmasSalas', as: 'turmasSalasum' });
    }
    return Turmas;
};
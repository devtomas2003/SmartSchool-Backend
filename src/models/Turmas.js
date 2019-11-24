'use strict';
module.exports = (sequelize, DataTypes) => {
    const Turmas = sequelize.define('Turmas', {
        turma: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Turmas'
    });
    Turmas.associate = function(models) {
        Turmas.belongsToMany(models.Profs, { foreignKey: 'idTurma', through: 'TurmasProfs', as: 'Turmasprofs' });
        Turmas.belongsToMany(models.Disciplinas, { foreignKey: 'idTurma', through: 'TurmasDisciplinas', as: 'Turmasdisciplinas' });
        Turmas.belongsToMany(models.Salas, { foreignKey: 'idTurma', through: 'TurmasSalas', as: 'Turmassalas' });
    }
    return Turmas;
};
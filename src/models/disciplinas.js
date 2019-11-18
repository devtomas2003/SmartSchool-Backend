'use strict';
module.exports = (sequelize, DataTypes) => {
    const disciplinas = sequelize.define('disciplinas', {
        disciplina: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'disciplinas'
    });
    disciplinas.associate = function(models) {
        disciplinas.belongsToMany(models.profs, { foreignKey: 'idDisciplina', through: 'profsDisciplinas', as: 'disciplinasProfsum' });
        disciplinas.belongsToMany(models.salas, { foreignKey: 'idDisciplina', through: 'salasDisciplinas', as: 'salasDisciplinasdois' });
    }
    return disciplinas;
};
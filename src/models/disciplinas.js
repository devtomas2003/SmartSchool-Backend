'use strict';
module.exports = (sequelize, DataTypes) => {
    const disciplinas = sequelize.define('disciplinas', {
        disciplina: DataTypes.STRING
    });
    disciplinas.associate = function(models) {
        disciplinas.belongsToMany(models.profs, { foreignKey: 'idDisciplina', through: 'profsDisciplinas', as: 'disciplinasProfs' });
        disciplinas.belongsToMany(models.salas, { foreignKey: 'idDisciplina', through: 'salasDisciplinas', as: 'disciplinasSalas' });
    }
    return disciplinas;
};
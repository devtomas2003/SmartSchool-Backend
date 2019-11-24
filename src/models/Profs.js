'use strict';
module.exports = (sequelize, DataTypes) => {
    const Profs = sequelize.define('Profs', {
        nome: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Profs'
    });
    Profs.associate = function(models) {
        Profs.belongsToMany(models.Salas, { foreignKey: 'idProf', through: 'ProfsSalas', as: 'profsSalas' });
        Profs.belongsToMany(models.Disciplinas, { foreignKey: 'idProf', through: 'ProfsDisciplinas', as: 'disciplinasProfs' });
        Profs.belongsToMany(models.Turmas, { foreignKey: 'idProf', through: 'TurmasProfs', as: 'turmasProfs' });
    }
    return Profs;
};
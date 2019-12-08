'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tempos = sequelize.define('Tempos', {
        ativa: DataTypes.INTEGER,
        idProf: DataTypes.INTEGER,
        idSala: DataTypes.INTEGER,
        idDia: DataTypes.INTEGER,
        idDisciplina: DataTypes.INTEGER,
        idTurma: DataTypes.INTEGER,
        idHora: DataTypes.INTEGER
    },{
        sequelize,
        tableName: 'Tempos'
    });
    Tempos.associate = function(models) {
        Tempos.belongsTo(models.Profs, { foreignKey: 'id', as: 'Profs' });
        Tempos.belongsTo(models.DiasDaSemana, { foreignKey: 'id', as: 'DiasDaSemana' });
        Tempos.belongsTo(models.Disciplinas, { foreignKey: 'id', as: 'Disciplinas' });
        Tempos.belongsTo(models.Horarios, { foreignKey: 'id', as: 'Horarios' });
        Tempos.belongsTo(models.Salas, { foreignKey: 'id', as: 'Salas' });
        Tempos.belongsTo(models.Turmas, { foreignKey: 'id', as: 'Turmas' });
    }
    return Tempos;
};
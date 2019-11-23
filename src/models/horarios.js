'use strict';
module.exports = (sequelize, DataTypes) => {
    const Horarios = sequelize.define('Horarios', {
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'Horarios'
    });
    Horarios.associate = function(models) {
        Horarios.belongsToMany(models.Salas, { foreignKey: 'idHorario', through: 'SalasHorarios', as: 'salasHorariosdois' });
    }
    return Horarios;
};
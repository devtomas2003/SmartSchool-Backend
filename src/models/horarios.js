'use strict';
module.exports = (sequelize, DataTypes) => {
    const horarios = sequelize.define('horarios', {
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE
    });
    horarios.associate = function(models) {
        horarios.belongsToMany(models.salas, { foreignKey: 'idHorario', through: 'salasHorarios', as: 'horariosSalas' });
    }
    return horarios;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
    const diasDaSemana = sequelize.define('diasDaSemana', {
        dia: DataTypes.STRING
    });
    diasDaSemana.associate = function(models) {
        diasDaSemana.belongsToMany(models.salas, { foreignKey: 'idSala', through: 'diasSalas', as: 'diasSalas' });
    }
    return diasDaSemana;
};
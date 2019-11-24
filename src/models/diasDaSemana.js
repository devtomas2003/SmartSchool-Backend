'use strict';
module.exports = (sequelize, DataTypes) => {
    const DiasDaSemana = sequelize.define('DiasDaSemana', {
        dia: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'DiasDaSemana'
    });
    DiasDaSemana.associate = function(models) {
        DiasDaSemana.belongsToMany(models.Salas, { foreignKey: 'idDia', through: 'DiasSalas', as: 'diasSalas' });
    }
    return DiasDaSemana;
};
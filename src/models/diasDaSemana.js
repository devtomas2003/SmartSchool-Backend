'use strict';
module.exports = (sequelize, DataTypes) => {
    const DiasDaSemana = sequelize.define('DiasDaSemana', {
        dia: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'DiasDaSemana'
    });
    DiasDaSemana.associate = function(models) {
        DiasDaSemana.belongsToMany(models.Salas, { foreignKey: 'idSala', through: 'DiasSalas', as: 'diasSalasum' });
    }
    return DiasDaSemana;
};
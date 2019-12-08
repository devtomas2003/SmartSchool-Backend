'use strict';
module.exports = (sequelize, DataTypes) => {
    const DiasDaSemana = sequelize.define('DiasDaSemana', {
        dia: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'DiasDaSemana'
    });
    return DiasDaSemana;
};
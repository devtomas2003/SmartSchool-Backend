'use strict';
module.exports = (sequelize, DataTypes) => {
    const Horarios = sequelize.define('Horarios', {
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'Horarios'
    });
    return Horarios;
};
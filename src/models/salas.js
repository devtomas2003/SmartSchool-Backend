'use strict';
module.exports = (sequelize, DataTypes) => {
    const Salas = sequelize.define('Salas', {
        sala: DataTypes.STRING,
        hash: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Salas'
    });
    return Salas;
};
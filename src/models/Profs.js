'use strict';
module.exports = (sequelize, DataTypes) => {
    const Profs = sequelize.define('Profs', {
        nome: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Profs'
    });
    return Profs;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Disciplinas = sequelize.define('Disciplinas', {
        disciplina: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Disciplinas'
    });
    return Disciplinas;
};
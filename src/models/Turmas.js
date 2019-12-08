'use strict';
module.exports = (sequelize, DataTypes) => {
    const Turmas = sequelize.define('Turmas', {
        turma: DataTypes.STRING
    }, {
        sequelize,
        tableName: 'Turmas'
    });
    return Turmas;
};
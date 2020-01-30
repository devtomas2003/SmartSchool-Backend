'use strict';
module.exports = (sequelize, DataTypes) => {
    const Utilizadores = sequelize.define('Utilizadores', {
        nome: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        turma: DataTypes.STRING,
        foto: DataTypes.STRING,
        userLevel: DataTypes.INTEGER,
        ativo: DataTypes.INTEGER,
        firstAccess: DataTypes.INTEGER,
        recuperated: DataTypes.INTEGER,
        checksum: DataTypes.STRING
    },{
        sequelize,
        tableName: 'Utilizadores'
    });
    return Utilizadores;
};
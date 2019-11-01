'use strict';
const { Model, DataTypes } = require('sequelize');
class utilizadores extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            procNumber: DataTypes.INTEGER,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            turma: DataTypes.STRING,
            foto: DataTypes.STRING,
            ativo: DataTypes.INTEGER
        }, {
            sequelize: connection
        });
    }
}

module.exports = utilizadores;
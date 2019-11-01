'use strict';
const { Model, DataTypes } = require('sequelize');
class profs extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            disciplina: DataTypes.INTEGER
        }, {
            sequelize: connection
        });
    }
}

module.exports = profs;
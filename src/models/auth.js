'use strict';
const { Model, DataTypes } = require('sequelize');
class auth_users extends Model{
    static init(connection){
        super.init({
            hash: DataTypes.STRING,
            expirationTime: DataTypes.DATE,
            device: DataTypes.STRING
        }, {
            sequelize: connection
        });
    }
    static associate(models){
        this.belongsTo(models.utilizadores, { foreignKey: 'idUser', as: 'userrelation' })
    }
}

module.exports = auth_users;
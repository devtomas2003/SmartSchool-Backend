'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserAtivation = sequelize.define('UserAtivation', {
        hash: DataTypes.STRING,
        userId: DataTypes.INTEGER,
    },{
        sequelize,
        tableName: 'UserAtivation'
    });
    return UserAtivation;
};
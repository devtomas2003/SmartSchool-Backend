'use strict';
module.exports = (sequelize, DataTypes) => {
    const Versions = sequelize.define('versions', {
        version: DataTypes.STRING,
        forceDownload: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'versions'
    });
    return Versions;
};
module.exports = (sequelize, DataTypes) => {
    const profs = sequelize.define('profs', {
        nome: DataTypes.STRING
    });
    return profs;
};
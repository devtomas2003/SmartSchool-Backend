module.exports = (sequelize, DataTypes) => {
    const profs = sequelize.define('profs', {
        nome: DataTypes.STRING,
        disciplina: DataTypes.INTEGER
    });
    return profs;
};
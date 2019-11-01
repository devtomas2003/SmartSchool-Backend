module.exports = (sequelize, DataTypes) => {
    const utilizadores = sequelize.define('utilizadores', {
        nome: DataTypes.STRING,
        procNumber: DataTypes.INTEGER,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        turma: DataTypes.STRING,
        foto: DataTypes.STRING,
        ativo: DataTypes.INTEGER
    });
    return utilizadores;
};
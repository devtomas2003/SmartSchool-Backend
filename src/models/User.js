module.exports = (sequelize, DataTypes) => {
    const utilizadores = sequelize.define('utilizadores', {
        nome: DataTypes.STRING,
        procNumber: DataTypes.INTEGER,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        turma: DataTypes.STRING,
        foto: DataTypes.STRING,
        userLevel: DataTypes.INTEGER,
        ativo: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'utilizadores'
    });
    return utilizadores;
};
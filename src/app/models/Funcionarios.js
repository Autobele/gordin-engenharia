module.exports = (sequelize, DataTypes) => {
    const Funcionarios = sequelize.define('Funcionarios', {
        name: DataTypes.STRING,
        matricula: DataTypes.STRING
    })

    return Funcionarios
}
// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const TipoUsuarios = sequelize.define('tipo_de_usuarios',{
    id_tipo_usuario: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo_usuarios:{
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = TipoUsuarios
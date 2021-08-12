// Importar los mudulos necesarios a utilizar
const DataTypes = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const Usuarios = sequelize.define('usuarios',{
    id_usuario: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombres:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellidos:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    correo:{
        type: DataTypes.STRING(40),
        allowNull: true
    },
    password:{
        type: DataTypes.STRING(15),
        alowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});

// Exportar el modelo
module.exports = Usuarios;
// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const TipoUsuarios = require('./db.modelo.tipoUsuarios');

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
        type: DataTypes.STRING(100),
        alowNull: false
    },
    activo:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    id_tipo_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
Usuarios.belongsTo(TipoUsuarios,{foreignKey: 'id_tipo_usuario'});

// Exportar el modelo
module.exports = Usuarios;
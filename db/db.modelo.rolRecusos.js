// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const RolRecursos = sequelize.define('rol_de_recursos',{
    id_rol_recurso: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rol_recurso:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    costo_mensual_recurso:{
        type: DataTypes.FLOAT,
        allowNull:false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});

// Exportar el modelo
module.exports = RolRecursos;
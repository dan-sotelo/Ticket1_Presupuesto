// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');

// Definir el modelo de la tabla para la DB
const ConceptoCostosAdministrativos = sequelize.define('concepto_costos_administrativos',{
    id_concepto: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    concepto_costo_administrativo: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});

// Exportar el modelo
module.exports = ConceptoCostosAdministrativos;
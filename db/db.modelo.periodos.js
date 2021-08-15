// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const VersionesPresupuestos = require('./db.modelo.versionesPresupuestos');

// Definir el modelo de la tabla para la DB
const Periodos = sequelize.define('periodos',{
    id_periodo:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    periodo:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    id_version_presupuesto:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});
Periodos.belongsTo(VersionesPresupuestos,{foreignKey: 'id_version_presupuesto'});

// Exportar el modelo
module.exports = Periodos;
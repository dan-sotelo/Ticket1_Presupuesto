// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const ConceptoCostosAdministrativos = require('./db.modelo.conceptoCostosAdministrativos');
const VersionPresupuestos = require('./db.modelo.versionesPresupuestos');
const Periodos = require('./db.modelo.periodos');

// Definir el modelo de la tabla para la DB
const CostosAdministrativos = sequelize.define('costos_administrativos',{
    id_costos_administrativos: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_concepto_costos_administrativos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    costos_administrativos_cantidad: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    id_periodo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_version_presupuesto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});

CostosAdministrativos.belongsTo(ConceptoCostosAdministrativos,{foreignKey: 'id_concepto_costos_administrativos'});
CostosAdministrativos.belongsTo(Periodos,{foreignKey: 'id_periodo'});
CostosAdministrativos.belongsTo(VersionPresupuestos,{foreignKey: 'id_version_presupuesto'});

// Exportar el modelo
module.exports = CostosAdministrativos;
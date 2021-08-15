// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const ConceptoCostosDirectos = require('./db.modelo.conceptoCostosDirectos');
const VersionesPresupuestos = require('./db.modelo.versionesPresupuestos');
const Periodos = require('./db.modelo.periodos');

// Definir el modelo de la tabla para la DB
const CostosDirectos = sequelize.define('costos_directos',{
    id_costos_directos: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_concepto_costos_directos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    costos_directos_cantidad: {
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

CostosDirectos.belongsTo(ConceptoCostosDirectos,{foreignKey: 'id_concepto_costos_directo'});
CostosDirectos.belongsTo(Periodos,{foreignKey: 'id_periodo'});
CostosDirectos.belongsTo(VersionesPresupuestos,{foreignKey: 'id_version_presupuesto'});

// Exportar el modelo
module.exports = CostosDirectos;
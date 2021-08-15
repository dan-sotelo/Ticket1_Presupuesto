// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const ConceptoIngresos = require('./db.modelo.conceptoIngresos');
const VersionesPresupuestos = require('./db.modelo.versionesPresupuestos');
const Periodos = require('./db.modelo.periodos');

// Definir el modelo de la tabla para la DB
const Ingresos = sequelize.define('ingresos',{
    id_ingresos: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_concepto_ingresos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ingresos_cantidad: {
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

Ingresos.belongsTo(ConceptoIngresos,{foreignKey: 'id_concepto_ingresos'});
Ingresos.belongsTo(Periodos,{foreignKey: 'id_periodo'});
Ingresos.belongsTo(VersionesPresupuestos,{foreignKey: 'id_version_presupuesto'});

// Exportar el modelo
module.exports = Ingresos;
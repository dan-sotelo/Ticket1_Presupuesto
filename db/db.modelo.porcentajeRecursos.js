// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const RolRecursos = require('./db.modelo.rolRecusos');
const VersionPresupuestos = require('./db.modelo.versionesPresupuestos');
const Periodos = require('./db.modelo.periodos');

// Definir el modelo de la tabla para la DB
const PorcentajeRecursos = sequelize.define('porcentaje_recursos',{
    id_porcentaje_recursos: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_rol_recurso: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    porcentaje_asignacion: {
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
PorcentajeRecursos.belongsTo(RolRecursos,{foreignKey: 'id_rol_recurso'});
RolRecursos.hasMany(PorcentajeRecursos,{foreignKey: 'id_rol_recurso'});

PorcentajeRecursos.belongsTo(Periodos,{foreignKey: 'id_periodo'});
Periodos.hasMany(PorcentajeRecursos,{foreignKey: 'id_periodo'});

PorcentajeRecursos.belongsTo(VersionPresupuestos,{foreignKey: 'id_version_presupuesto'});
VersionPresupuestos.hasMany(PorcentajeRecursos,{foreignKey: 'id_version_presupuesto'});

// Exportar el modelo
module.exports = PorcentajeRecursos;
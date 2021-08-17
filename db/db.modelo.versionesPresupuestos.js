// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Proyectos = require('./db.modelo.proyectos');

// Definir el modelo de la tabla para la DB
const VersionPresupuestos = sequelize.define('version_de_presupuestos',{
    id_version_presupuesto:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    version:{
        type: DataTypes.STRING(5),
        allowNull: false
    },
    id_proyecto:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
});

VersionPresupuestos.belongsTo(Proyectos,{foreignKey: 'id_proyecto'});
VersionPresupuestos.belongsTo(Usuarios,{foreignKey: 'id_usuario'});

// Exportar el modelo
module.exports = VersionPresupuestos;
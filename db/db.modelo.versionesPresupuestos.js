// Importar los mudulos necesarios a utilizar
const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios');
const Presupuestos = require('./db.modelo.presupuestos');

// Definir el modelo de la tabla para la DB
const VersionesPresupuestos = sequelize.define('versiones_de_presupuestos',{
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
    id_presupuesto:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
});

VersionesPresupuestos.belongsTo(Presupuestos,{foreignKey: 'id_presupuesto'});
VersionesPresupuestos.belongsTo(Usuarios,{foreignKey: 'id_usuario'});

// Exportar el modelo
module.exports = VersionesPresupuestos;
// Importar los mudulos necesarios a utilizar
const Presupuestos = require('../../db/db.modelo.presupuestos');
const VersionesPresupuestos = require('../../db/db.modelo.versionesPresupuestos');

// Definir los modulos
let registrarPresupuesto = async(presupuesto) =>{
    try {
        let existePresupuesto = await Presupuestos.findOne({where: {presupuesto_nombre_proyecto: `${presupuesto.nombre_proyecto}`}});
        if(existePresupuesto == null){
            let nuevoPresupuesto = await Presupuestos.create({
                presupuesto_nombre_proyecto: presupuesto.nombre_proyecto
            });
            return nuevoPresupuesto;
        } else {
            throw new Error('Presupuesto ya existente')
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar el presupuesto: ${error}`);
        throw new Error(error.message);
    }
}

let registrarVersion = async(proyecto) =>{
    try{
        let existeVersion = await VersionesPresupuestos.findOne({where: {version: `${proyecto.version}`}});
        if (existeVersion == null){
            let nuevaVersion = await VersionesPresupuestos.create({
                version: proyecto.version,
                id_presupuesto: proyecto.id_presupuesto,
                id_usuario: proyecto.id_usuario
            })
        }
    } catch(error){
        console.log(`Error en el modelo al registrar la version del presupuesto: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarPresupuesto}
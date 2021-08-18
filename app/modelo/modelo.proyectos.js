// Importar los mudulos necesarios a utilizar
const Proyectos = require('../../db/db.modelo.proyectos');
const VersionPresupuestos = require('../../db/db.modelo.versionesPresupuestos');

// Definir los modulos
let registrarProyecto = async(nombreProyecto) =>{
    try {
        let proyectoRegistrado = await Proyectos.findOne({where: {proyecto_nombre: `${nombreProyecto}`}});
        if(proyectoRegistrado == null){
            let nuevoProyecto = await Proyectos.create({
                proyecto_nombre: nombreProyecto
            });
            return nuevoProyecto;
        } else {
            throw new Error('Proyecto ya registrado')
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar el Proyecto: ${error}`);
        throw new Error(error.message);
    }
}

let registrarVersion = async(proyecto,version,usuarioEditor) =>{
    try{
        let versionPresupuestoRegistrado = await VersionPresupuestos.findOne({where: {id_proyecto: `${proyecto}`,version: `${proyecto.version}`}});
        if (versionPresupuestoRegistrado == null){
            let nuevaVersion = await VersionPresupuestos.create({
                version: version,
                id_proyecto: proyecto,
                id_usuario: usuarioEditor
            });
            return nuevaVersion;
        }
    } catch(error){
        console.log(`Error en el modelo al registrar la version del presupuesto: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarProyecto, registrarVersion}
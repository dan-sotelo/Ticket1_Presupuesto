// Importar los mudulos necesarios a utilizar
const Proyectos = require('../../db/db.modelo.proyectos');
const VersionPresupuestos = require('../../db/db.modelo.versionesPresupuestos');
const Usuarios = require('../../db/db.modelo.usuarios');
const TipoUsuarios = require('../../db/db.modelo.tipoUsuarios');

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
                activo: true,
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

let listarPresupuestos = async() =>{
    try{
        let presupuestos = await VersionPresupuestos.findAll({
            attributes:{exclude:['id_proyecto','id_usuario']},
            include:[
                {
                    model: Proyectos, 
                    attributes: {exclude: ['fecha_actualizacion']},
                    required: true
                },
                {
                    model:Usuarios, 
                    attributes: {exclude: ['password','id_tipo_usuario','fecha_registro','fecha_actualizacion']},
                    include:{model:TipoUsuarios, attributes: {exclude: 'id_tipo_usuario'},required:true},
                    required:true
                }]
        });
        return presupuestos;
    } catch(error) {
        console.log(`Error en el modelo al listar los presupuestos ${error}`);
        throw new Error(error.message);
    }
}

let actualizarProyecto = async(idPresupuesto, nombreProyecto, version, usuarioEditor) =>{
    try{
        let presupuestoRegistrado = await VersionPresupuestos.findOne({where: {id_version_presupuesto:`${idPresupuesto}`}});
        let proyectoRegistrado = await Proyectos.findOne({where: {id_proyecto: `${presupuestoRegistrado.id_proyecto}`}});
        if(presupuestoRegistrado != null){
            if(presupuestoRegistrado.version != version){
                await VersionPresupuestos.update({version: `${version}`}, {where: {id_version_presupuesto: `${idPresupuesto}`}})
            }
            if(presupuestoRegistrado.id_usuario != usuarioEditor ){
                await VersionPresupuestos.update({id_usuario: `${usuarioEditor}`}, {where: {id_version_presupuesto: `${idPresupuesto}`}}) 
            }
            if(proyectoRegistrado.proyecto_nombre != nombreProyecto){
                await Proyectos.update({proyecto_nombre: `${nombreProyecto}`}, {where: {id_proyecto: `${proyectoRegistrado.id_proyecto}`}}) 
            }
            return true;
        } else {
            throw new Error('El presupuesto no se encuentra registrado');
        }
    } catch(error) {
        console.log(`Error en el modelo al actualizar el proyecto: ${error}`);
        throw new Error(error.message);
    }
}

let informacionGeneral = async(idPresupuesto) =>{
    try{
        let infoPresupuesto = await VersionPresupuestos.findAll({
            attributes:{exclude:['id_proyecto','id_usuario']},
            include: [
                {
                    model: Proyectos,
                    attributes: {exclude:['fecha_actualizacion']},
                    required: true
                },
                {
                    model:Usuarios, 
                    attributes: ['id_usuario','correo',['activo','usuario_activo']],
                    include:{model:TipoUsuarios, attributes: [['tipo_usuarios','credencial']],required:true},
                    required:true
                }
            ],
            where: {id_version_presupuesto: `${idPresupuesto}`}
        })
        return infoPresupuesto;
    } catch(error) {
        console.log(`Error en el modelo al consultar la información general del proyectos ${error}`);
        throw new Error(error.message);
    }
}

let desactivarPresupuesto = async(idPresupuesto) =>{
    try{
        let presupuestoRegistrado = await VersionPresupuestos.findOne({where: {id_version_presupuesto:`${idPresupuesto}`}})
        if(presupuestoRegistrado != null){
            let proyecto = presupuestoRegistrado.id_proyecto;
            await VersionPresupuestos.update({activo: false}, {where: {id_proyecto: `${proyecto}`}});
        } else {
            throw new Error('El presupuesto no se encuentra registrado en la base de datos');
        }
    } catch(error) {
        console.log(`Error en el modelo al desactivar el presupuesto ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarProyecto, registrarVersion, listarPresupuestos, informacionGeneral, desactivarPresupuesto, actualizarProyecto};
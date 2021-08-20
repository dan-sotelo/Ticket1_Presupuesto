// Importar los mudulos necesarios a utilizar
const RolRecursos = require('../../db/db.modelo.rolRecusos');
const PorcentajeRecursos = require('../../db/db.modelo.porcentajeRecursos');
const Periodos = require('../../db/db.modelo.periodos');

// Definir los modelos
let registrarRol = async(recurso,costoMensual) =>{
    try{
        let recursoRegistrado = await RolRecursos.findOne({where: {rol_recurso: `${recurso}`}});
        if(recursoRegistrado == null){
            let nuevoRecurso = await RolRecursos.create({
                rol_recurso: recurso,
                costo_mensual_recurso: costoMensual
            })
            return nuevoRecurso
        } else {
            return recursoRegistrado;
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar el recurso: ${error}`);
        throw new Error(error.message);
    }
}

let asignarPorcentaje = async(idRecurso,porcentaje,periodo,idPresupuesto) =>{
    try {
        let nuevaAsignacion = await PorcentajeRecursos.create({
            id_rol_recurso: idRecurso,
            porcentaje_asignacion: porcentaje,
            id_periodo: periodo,
            id_version_presupuesto: idPresupuesto
        });
        return nuevaAsignacion;
    } catch (error) {
        console.log(`Error en el modelo al asignar el porcentaje al recurso: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarPorcentaje = async(idRecurso,porcentaje,periodo,idPresupuesto) =>{
    try{
        let porcentajeRegistrado = await PorcentajeRecursos.findOne({where: {id_rol_recurso: `${idRecurso}`, id_periodo: `${periodo}`, id_version_presupuesto: `${idPresupuesto}`}});
        if(porcentajeRegistrado == null){
            let nuevaAsignacion = await PorcentajeRecursos.create({
                id_rol_recurso: idRecurso,
                porcentaje_asignacion: porcentaje,
                id_periodo: periodo,
                id_version_presupuesto: idPresupuesto
            });
            return nuevaAsignacion;
        } else {
            let actualizarAsignacion = await PorcentajeRecursos.update({porcentaje_asignacion: `${porcentaje}`}, {where: {id_porcentaje_recursos: `${porcentajeRegistrado.id_porcentaje_recursos}`}});
            return actualizarAsignacion;
        }
    }catch(error){
        console.log(`Error en el modelo al actualizar el porcentaje al recurso: ${error}`);
        throw new Error(error.message);
    }
}

let listarPorcentajeRecursos = async(idPresupuesto) =>{
    try{
        let porcentaje = await PorcentajeRecursos.findAll({
            attributes: [['id_porcentaje_recursos','id_porcentaje'],['porcentaje_asignacion','Porcentaje']],
            include:[
                {
                    model: RolRecursos,
                    attributes:[['rol_recurso','Recurso'],['costo_mensual_recurso','Costo_mensual']],
                    required: true
                },
                {
                    model: Periodos,
                    attributes: [['periodo','Periodo']],
                    required: true
                }
            ],
            where: {id_version_presupuesto: `${idPresupuesto}`}
        });
        return porcentaje;
    } catch(error) {
        console.log(`Error en el modelo al listar el porcentaje de asignación por recursos recurso: ${error}`);
        throw new Error(error.message);
    }
}
// Exportar modulos
module.exports = {registrarRol, asignarPorcentaje, listarPorcentajeRecursos, actualizarPorcentaje};
// Importar los modulos necesarios a utilizar
const modeloProyectos = require('../modelo/modelo.proyectos');
const modeloPeriodos = require('../modelo/modelo.periodos');
const modeloIngresos =require('../modelo/modelo.ingresos');
const modeloCostosDirectos = require('../modelo/modelo.costosDirectos');
const modeloCostosAdministrativos = require('../modelo/modelo.costosAdministrativos');
const modeloRecursos = require('../modelo/modelo.porcentajeDeRecursos');

// Definir los modulos
let registrarProyecto = async(nombreProyecto,version,usuarioEditor) =>{
    try {
        let nuevoProyecto = await modeloProyectos.registrarProyecto(nombreProyecto);
        let nuevaVersion = await modeloProyectos.registrarVersion(nuevoProyecto.id_proyecto,version,usuarioEditor);
        return nuevaVersion;
    } catch (error) {
        console.log(`Error en el controlador al registrar el nuevo proyecto: ${error}`);
        throw new Error(error.message);
    }
}

let registrarDatos = async(datos,idPresupuesto) =>{
    try {
        for (periodos in datos){
            let nuevoPeriodo = await modeloPeriodos.registrarPeriodos(datos[periodos].periodo,idPresupuesto);
            let ingresos = datos[periodos].ingresos
            for (conceptos in ingresos){
                let nuevoConcepto = await modeloIngresos.registrarConceptos(ingresos[conceptos].concepto);
                let nuevoIngreso = await modeloIngresos.registrarIngresos(nuevoConcepto.id_concepto,ingresos[conceptos].cantidad,nuevoPeriodo.id_periodo,idPresupuesto);
            }

            let costosDirectos = datos[periodos].costos_directos
            for (conceptosCD in costosDirectos){
                let nuevoConceptoCD = await modeloCostosDirectos.registarConceptosCD(costosDirectos[conceptosCD].concepto);
                let nuevoCostoDirecto = await modeloCostosDirectos.registrarCostosDirectos(nuevoConceptoCD.id_concepto,costosDirectos[conceptosCD].cantidad,nuevoPeriodo.id_periodo,idPresupuesto);
            }

            let costosAdministrativos = datos[periodos].costos_administrativos
            for (conceptosCA in costosAdministrativos){
                let nuevoConceptoCA = await modeloCostosAdministrativos.registarConceptosCA(costosAdministrativos[conceptosCA].concepto);
                let nuevoCostoAdministrativo = await modeloCostosAdministrativos.registrarCostosAdministrativos(nuevoConceptoCA.id_concepto, costosAdministrativos[conceptosCA].cantidad, nuevoPeriodo.id_periodo, idPresupuesto);
            }

            let porcentajeRecursos = datos[periodos].porcentaje_recursos
            for (recursos in porcentajeRecursos){
                let nuevoRecurso = await modeloRecursos.registrarRol(porcentajeRecursos[recursos].rol_recurso, porcentajeRecursos[recursos].costo_mensual);
                let nuevoPorcentaje = await modeloRecursos.asignarPorcentaje(nuevoRecurso.id_rol_recurso, porcentajeRecursos[recursos].porcentaje, nuevoPeriodo.id_periodo, idPresupuesto)
            }
        }
    } catch(error) {
        console.log(`Error en el modelo al registrar los datos: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarProyecto,registrarDatos};
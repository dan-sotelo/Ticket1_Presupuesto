// Importar los mudulos necesarios a utilizar
const ConceptoCostosAdministrativos = require('../../db/db.modelo.conceptoCostosAdministrativos');
const CostosAdministrativos = require('../../db/db.modelo.costosAdministrativos');

// Definir los modulos
let registarConceptosCA = async(conceptoCA) =>{
    try {
        let conceptoRegistrado = await ConceptoCostosAdministrativos.findOne({where: {concepto_costo_administrativo: `${conceptoCA}`}});
        if(conceptoRegistrado == null){
            let nuevoConcepto = await ConceptoCostosAdministrativos.create({
                concepto_costo_administrativo: conceptoCA
            })
            return nuevoConcepto;
        } else {
            return conceptoRegistrado;
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar el concepto: ${error}`);
        throw new Error(error.message);
    }
}

let registrarCostosAdministrativos = async(conceptoCA,cantidad,periodo,idPresupuesto) =>{
    try{
        let nuevoCostoAdministrativo = await CostosAdministrativos.create({
            id_concepto_costos_administrativos: conceptoCA,
            costos_administrativos_cantidad: cantidad,
            id_periodo: periodo,
            id_version_presupuesto: idPresupuesto
        });
        return nuevoCostoAdministrativo;
    } catch (error){
        console.log(`Error en el modelo al registrar los costos administrativos: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar lo modulos
module.exports = {registarConceptosCA,registrarCostosAdministrativos}
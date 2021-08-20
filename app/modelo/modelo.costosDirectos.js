// Importar los mudulos necesarios a utilizar
const ConceptoCostosDirectos = require('../../db/db.modelo.conceptoCostosDirectos');
const CostosDirectos = require('../../db/db.modelo.costosDirectos');
const Periodos = require('../../db/db.modelo.periodos');

// Definir los modulos
let registarConceptosCD = async(conceptoCD) =>{
    try {
        let conceptoRegistrado = await ConceptoCostosDirectos.findOne({where: {concepto_costos_directos: `${conceptoCD}`}});
        if(conceptoRegistrado == null){
            let nuevoConcepto = await ConceptoCostosDirectos.create({
                concepto_costos_directos: conceptoCD
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

let registrarCostosDirectos = async(conceptoCD,cantidad,periodo,idPresupuesto) =>{
    try{
        let nuevoCostoDirecto = await CostosDirectos.create({
            id_concepto_costos_directos: conceptoCD,
            costos_directos_cantidad: cantidad,
            id_periodo: periodo,
            id_version_presupuesto: idPresupuesto
        });
        return nuevoCostoDirecto;
    } catch (error){
        console.log(`Error en el modelo al registrar los costos directos: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarCostosDirectos = async(conceptoCD,cantidad,periodo,idPresupuesto) =>{
    try{
        let costoDirectoRegistrado = await CostosDirectos.findOne({where: {id_concepto_costos_directos:`${conceptoCD}`,id_periodo:`${periodo}`,id_version_presupuesto:`${idPresupuesto}`}});
        if(costoDirectoRegistrado == null){
            let nuevoCostoDirecto = await CostosDirectos.create({
                id_concepto_costos_directos: conceptoCD,
                costos_directos_cantidad: cantidad,
                id_periodo: periodo,
                id_version_presupuesto: idPresupuesto
            });
            return nuevoCostoDirecto;
        } else {
            let actualizarCosto = await CostosDirectos.update({costos_directos_cantidad: `${cantidad}`}, {where: {id_costos_directos: `${costoDirectoRegistrado.id_costos_directos}`}});
            return actualizarCosto;
        }
    } catch(error) {
        console.log(`Error en el modelo al actualizar los costos directos: ${error}`);
        throw new Error(error.message);
    }
}

let listarCostosDirectos = async(idPresupuesto) =>{
    try{
        let costosDirectos = await CostosDirectos.findAll({
            attributes:['id_costos_directos',['costos_directos_cantidad','Cantidad']],
            include: [
                {
                    model: ConceptoCostosDirectos,
                    attributes: [['concepto_costos_directos','Concepto']],
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
        return costosDirectos;
    } catch(error) {
        console.log(`Error en el modelo al listar los costos directos: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar lo modulos
module.exports = {registarConceptosCD, registrarCostosDirectos, listarCostosDirectos, actualizarCostosDirectos};
// Importar los mudulos necesarios a utilizar
const ConceptoIngresos = require('../../db/db.modelo.conceptoIngresos');
const Ingresos = require('../../db/db.modelo.ingresos');
const Periodos = require('../../db/db.modelo.periodos');

// Definir los modulos
let registrarConceptos = async (concepto)=>{
    try {
        let conceptoRegistrado = await ConceptoIngresos.findOne({where: {concepto_ingresos: `${concepto}`}});
        if(conceptoRegistrado == null){
            let nuevoConcepto = await ConceptoIngresos.create({
                concepto_ingresos: concepto
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

let registrarIngresos = async(concepto,cantidad,periodo,idPresupuesto)=>{
    try {
        let nuevoIngreso = await Ingresos.create({
            id_concepto_ingresos: concepto,
            ingresos_cantidad: cantidad,
            id_periodo: periodo,
            id_version_presupuesto: idPresupuesto
        });
        return nuevoIngreso;
    } catch (error) {
        console.log(`Error en el modelo al registrar los ingresos: ${error}`);
        throw new Error(error.message);
    }
}

let actualizarIngresos = async(concepto,cantidad,periodo,idPresupuesto) =>{
    try{
        let ingresoRegistrado = await Ingresos.findOne({where: {id_concepto_ingresos: `${concepto}`,id_periodo: `${periodo}`, id_version_presupuesto:`${idPresupuesto}`}})
        if(ingresoRegistrado == null){
            let nuevoIngreso = await Ingresos.create({
                id_concepto_ingresos: concepto,
                ingresos_cantidad: cantidad,
                id_periodo: periodo,
                id_version_presupuesto: idPresupuesto
            });
            return nuevoIngreso;
        } else {
            let actualizarIngreso = await Ingresos.update({ingresos_cantidad: `${cantidad}`}, {where: {id_ingresos: `${ingresoRegistrado.id_ingresos}`}})
            return actualizarIngreso;
        }
    } catch(error) {
        console.log(`Error en el modelo al actualizar los ingresos: ${error}`);
        throw new Error(error.message);
    }
}

let listarIngresos = async(idPresupuesto) =>{
    try{
        let ingresos = await Ingresos.findAll({
            attributes: ['id_ingresos',['ingresos_cantidad','Cantidad']],
            include:[
                {
                    model: ConceptoIngresos,
                    attributes: [['concepto_ingresos','Concepto']],
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
        return ingresos;
    } catch(error) {
        console.log(`Error en el modelo al listar los ingresos: ${error}`);
        throw new Error(error.message);
    }
};

// Exportar los modulos
module.exports = {registrarConceptos, registrarIngresos, listarIngresos, actualizarIngresos};
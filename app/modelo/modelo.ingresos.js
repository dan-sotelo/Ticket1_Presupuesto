// Importar los mudulos necesarios a utilizar
const ConceptoIngresos = require('../../db/db.modelo.conceptoIngresos');
const Ingresos = require('../../db/db.modelo.ingresos');

// Definir los modulos
let registrarConceptos = async(conceptos)=>{
    try {
        let i = 0;
        for(concepto in conceptos){
            let existeConcepto = await ConceptoIngresos.findOne({where: {concepto_ingresos: `${conceptos[concepto]}`}});
            if(existeConcepto == null){
                await ConceptoIngresos.create({
                    concepto_ingresos: conceptos[concepto]
                })
                i++;
            }
        }
        if(i==0){
            throw new Error('Todos los conceptos ya estan registrados');
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar al usuario: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarConceptos};
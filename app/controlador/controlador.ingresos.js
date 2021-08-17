// Importar los mudulos necesarios a utilizar
const modeloIngresos = require('../modelo/modelo.ingresos');

// Definir los modulos
let registrarConceptos = async(conceptos) =>{
    try {
        let nuevosConceptos = await modeloIngresos.registrarConceptos(conceptos);
    } catch (error) {
        console.log(`Error en el controlador al registrar los conceptos: ${error}`);
        throw new Error(error.message);
    }
}

let registrarIngreso = async(ingresos) =>{
    try {
        let nuevoIngreso = await modeloIngresos.registrarIngreso(ingresos);
    } catch (error) {
        console.log(`Error en el controlador al registrar los ingresos: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarConceptos, registrarIngreso};
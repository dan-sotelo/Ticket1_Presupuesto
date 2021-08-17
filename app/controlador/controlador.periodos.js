// Importar los mudulos necesarios a utilizar
const modeloPeriodos = require('../modelo/modelo.periodos');

// Definir los modulos
let registrarPeriodos = async(periodos) =>{
    try {
        let nuevosPeriodos = await modeloPeriodos.registrarPeriodos(periodos);
    } catch (error) {
        console.log(`Error en el controlador al registrar los periodos: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {registrarPeriodos}
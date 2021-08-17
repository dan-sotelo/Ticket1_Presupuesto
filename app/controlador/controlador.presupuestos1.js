// Importar los mudulos necesarios a utilizar
const modeloPresupuestos = require('../modelo/modelo.presupuestos');

// Definir los modulos
let registrarPresupuesto = async(presupuesto) =>{
    try{
        let nuevoPresupuesto = await modeloPresupuestos.registrarPresupuesto(presupuesto);
        return nuevoPresupuesto;
    } catch (error) {
        console.log(`Error en el controlador al registrar un nuevo usuario: ${error}`);
        throw new Error(error.message);
    }
}

let registrarVersion = async(proyecto) =>{
    try{
        let nuevaVersionPresupuesto = await controladorPresupuestos.registrarVersion(proyecto);
        return nuevaVersionPresupuesto;
    } catch (error) {
        console.log(`Error en el controlador al registrar un nuevo usuario: ${error}`);
        throw new Error(error.message);
    }
}

module.exports = {registrarPresupuesto, registrarVersion};
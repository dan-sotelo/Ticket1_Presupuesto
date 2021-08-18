// Importar los mudulos necesarios a utilizar
const Periodos = require('../../db/db.modelo.periodos');

// Definir los modulos
let registrarPeriodos = async(periodo, idPresupuesto) =>{
    try {
        let periodoRegistrado = await Periodos.findOne({where: {periodo: `${periodo}`,id_version_presupuesto: `${idPresupuesto}`}});
        if (periodoRegistrado == null){
            let nuevoPeriodo = await Periodos.create({
                periodo: periodo,
                id_version_presupuesto: idPresupuesto
            })
            return nuevoPeriodo;
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar los periodos: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar modulos
module.exports = {registrarPeriodos};
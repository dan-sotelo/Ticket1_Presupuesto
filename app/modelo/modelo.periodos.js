// Importar los mudulos necesarios a utilizar
const Periodos = require('../../db/db.modelo.periodos');

// Definir los modulos
let registrarPeriodos= async(periodos) =>{
    try {
        let i = 0;
        for(periodo in periodos){
            let existePeriodo = await Periodos.findOne({where: `${periodos.periodo}`});
            if (existePeriodo == null){
                await Periodos.create({
                    periodo: periodos.periodos,
                    id_version_presupuesto: periodo.id_version_presupuesto
                })
                i++;
            }
        }
        if(i==0){
            throw new Error('Todos los periodos ya estan registrados')
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar los periodos: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar modulos
module.exports = registrarPeriodos;
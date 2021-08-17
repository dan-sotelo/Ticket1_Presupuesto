// Importar los mudulos necesarios a utilizar
const controladorPeriodos = require('../controlador/controlador.periodos');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) => {
    // Endpoint para el registro de un nuevo periodo
    app.post('/presupuesto/periodos', async(req, res)=>{
        let periodos = req.body;
        try{
            let nuevosPeriodos = await controladorPeriodos.registrarPeriodos(periodos);
            res.status(200).json({message: 'Registro exitoso'});
        } catch(error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}
// Importar los mudulos necesarios a utilizar
const controladorPresupuestos = require('../controlador/controlador.presupuestos');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definicr los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para registrar un nuevo presupuesto
    app.pos('presupuestos', async(req, res)=>{
        let presupuesto = req.body;
        try {
            let nuevoProyecto = await controladorPresupuestos.registrarProyecto(presupuesto);
            res.status(200).json({message: 'Registro de presupuesto exitoso'});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}
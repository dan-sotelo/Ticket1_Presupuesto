// Importar los mudulos necesarios a utilizar
const controladorPresupuestos = require('../controlador/controlador.presupuestos1');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definicr los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para registrar un nuevo presupuesto
    app.post('/presupuestos', async(req, res)=>{
        let presupuesto = req.body;
        try {
            let nuevoPresupuesto = await controladorPresupuestos.registrarPresupuesto(presupuesto);
            res.status(200).json({message: 'Registro de proyecto exitoso', nuevoPresupuesto});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })

    // Endpoint para registrar una nueva versión
    app.post('/presupuestos/versiones', async(req,res)=>{
        let proyecto = req.body;
        try {
            let nuevaVersionPresupuesto = await controladorPresupuestos.registrarVersion(proyecto);
            res.status(200).json({message: 'Registro exitoso', nuevaVersionPresupuesto});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })
}
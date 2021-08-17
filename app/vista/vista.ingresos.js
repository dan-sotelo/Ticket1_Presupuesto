// Importar los mudulos necesarios a utilizar
const controladorIngresos = require('../controlador/controlador.ingresos');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) => {
    // Endpoint para registrar en la DB los conceptos asociados a los ingresos.
    app.post('/ingresos/concepto', async(req,res) =>{
        let conceptos = req.body;
        try {
            let nuevosConceptos = await controladorIngresos.registrarConceptos(conceptos);
            res.status(200).json({message: 'Registro exitoso'});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })

    // Endpoint para registar
    app.post('/ingresos', async(req, res) =>{
        let ingresos = req.body;
        try{
            let nuevoIngreso = await controladorIngresos.registrarIngreso(ingresos);
            res.status(200).json({message: 'Registro exitoso'});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })
}
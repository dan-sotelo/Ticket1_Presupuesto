// Importar los mudulos necesarios a utilizar
const controladorPresupuestos = require('../controlador/controlador.presupuestos');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definicr los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para registrar un nuevo presupuesto
    app.post('/presupuestos', middUsuarios.validarUsuario, middUsuarios.validarAccesoUsuario, async(req, res)=>{
        let presupuesto = req.body;
        let usuarioEditor = req.params.usuario;
        try {
            let nuevoProyecto = await controladorPresupuestos.registrarProyecto(presupuesto.nombreProyecto,presupuesto.version,usuarioEditor.id_usuario);
            let registrarDatos = await controladorPresupuestos.registrarDatos(presupuesto.datos,nuevoProyecto.id_version_presupuesto);
            res.status(200).json({message: 'Registro de presupuesto exitoso'});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para la tabla de presupuestos (Página principal)
    
}
// Importar los mudulos necesarios a utilizar
const controladorPresupuestos = require('../controlador/controlador.presupuestos');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definicr los endpoints y exportar los modulos
module.exports = async(app) =>{
    // Endpoint para registrar un nuevo presupuesto
    app.post('/presupuestos/nuevo_presupuesto', middUsuarios.validarUsuario, middUsuarios.validarAccesoUsuario, async(req, res)=>{
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
    app.get('/presupuestos', middUsuarios.validarUsuario, middUsuarios.validarAccesoUsuario, async(req,res)=>{
        try{
            let presupuestos = await controladorPresupuestos.listarPresupuestos();
            res.status(200).json({message: 'Consulta exitosa', presupuestos});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para registrar un presupuesto que ha sido editado (Su versión cambia de acuerdo a la indicacion desde el front)
    app.patch('/presupuestos/actualizar/:idPresupuesto', middUsuarios.validarUsuario, middUsuarios.validarAccesoUsuario, async(req, res) =>{
        let usuarioEditor = req.params.usuario;
        let idPresupuesto = req.params.idPresupuesto;
        let presupuestoEditado = req.body;
        try{
            let proyectoEditado = await controladorPresupuestos.actualizarProyecto(idPresupuesto,presupuestoEditado.nombreProyecto,presupuestoEditado.version,usuarioEditor.id_usuario);
            if(proyectoEditado){
                let actualizarValores = await controladorPresupuestos.actualizarDatos(presupuestoEditado.datos,idPresupuesto)
                res.status(200).json({message: 'Actualización de proyecto exitosa'});
            }
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para obtener la información completa de un proyecto: nombre, version, ingresos, costos directos, costos administrativos y asignación de porcentaje
    app.get('/presupuestos/:idPresupuesto',middUsuarios.validarUsuario, middUsuarios.validarAccesoUsuario, async(req, res) =>{
        let idPresupuesto = req.params.idPresupuesto
        try{
            let presupuesto = await controladorPresupuestos.informacionGeneral(idPresupuesto);
            let valores = await controladorPresupuestos.valoresDePresupuesto(idPresupuesto);
            res.status(200).json({message: 'Consulta exitosa', presupuesto, valores});
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });

    // Endpoint para "Eliminar un presupuesto" (Unicamente se modifica el atributo de activo)
    app.patch('/presupuestos/desactivar/:idPresupuesto', middUsuarios.validarUsuario, middUsuarios.validarAccesoUsuario, async(req,res)=>{
        let idPresupuesto = req.params.idPresupuesto;
        try{
            await controladorPresupuestos.desactivarPresupuesto(idPresupuesto);
            res.status(200).json({message: 'Operacion exitosa'})
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    });
}
// Importar los mudulos necesarios a utilizar
const controladorUsuarios = require('../controlador/controlador.usuarios');
const middUsuarios = require('../../middlewares/midd.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) => {
    // Endpoint para el registro de usuarios
    app.post('/usuarios/nuevo_registro', middUsuarios.datosRegistro, async(req, res)=>{
        let usuario = req.body;
        try {
            let nuevoUsuario = await controladorUsuarios.nuevoRegistro(usuario);
            res.status(200).json({message: 'Registro de usuario exitoso',nuevoUsuario})
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })

    // Endpoint para el ingreso de usuarios
    app.post('/usuarios/iniciar_sesion', middUsuarios.datosIniciarSesion, async(req, res)=>{
        let usuario = req.body;
        try {
            let infoUsuario = await controladorUsuarios.buscarUsuario(usuario);
            if(infoUsuario != null){
                let token = await controladorUsuarios.generarToken(infoUsuario);
                res.status(200).json({message: 'El usuario es valido', token});
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })

    // Endpoint para cambiar la contraseña de usuario
    app.patch('/usuarios/cambiar_password', async(req, res)=>{
        let usuario = req.body
        try{
            let nuevaPassword = await controladorUsuarios.cambiarPassword(usuario);
            res.status(200).json({message: 'Actualización exitosa de password'});
        } catch (error){
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })

    // Endpoint solo para ver la lista de usuarios
    app.get('/usuarios', middUsuarios.validarUsuario, middUsuarios.validarAccesoUsuario , async(req, res) =>{
        try {
            let usuarios = await controladorUsuarios.listarUsuarios();
            res.status(200).json({message: 'Consulta exitosa', usuarios});
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: error.mesage});
        }
    })
};
// Importar los mudulos necesarios a utilizar
const controladorUsuarios = require('../controlador/controlador.usuarios');

// Definir los endpoints y exportar los modulos
module.exports = async(app) => {
    // Endpoint para el registro de usuarios
    app.post('/usuarios/nuevo_registro', async(req, res)=>{
        let usuario = req.body;
        try {
            let nuevoUsuario = await controladorUsuarios.nuevoRegistro(usuario);
            res.status(200).json({message: 'Registro de usuario exitoso', nuevoUsuario})
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })

    // Endpoint para el ingreso de usuarios
    app.post('/usuarios/iniciar_sesion', async(req, res)=>{
        let usuario = req.body;
        try {
            let revisarIngreso = await controladorUsuarios.buscarUsuario(usuario);
            if(revisarIngreso){
                let token = await controladorUsuarios.generarToken();
                res.status(200).json({message: 'El usuario es valido', token});
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })

    // Endpoint para camciar la contraseña de usuario
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
    app.get('/usuarios', async(req, res) =>{
        try {
            let usuarios = await controladorUsuarios.listarUsuarios();
            res.status(200).json({message: 'Consulta exitosa', usuarios});
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: error.mesage});
        }
    })
};
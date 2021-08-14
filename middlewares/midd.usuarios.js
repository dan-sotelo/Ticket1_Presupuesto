// Importar los mudulos necesarios a utilizar
const rateLimit = require('express-rate-limit');
const controladorUsuarios = require('../app/controlador/controlador.usuarios');

// Middleware para limitar el número de peticiones por usuario
const limiteConsultas = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Excedio el número de peticiones al servidor'
})

// Middleware para validaciones de acceso
let validarUsuario = async(req, res, next) => {
    try {
        if (req.headers.authorization != undefined){
            const token = req.headers.authorization.split(' ')[1];
            let verificacion = await controladorUsuarios.verificarToken(token);
            req.params.usuario = verificacion.usuario;
            return next();
        } else {
            throw new Error ('Se requiere autorización para acceder a este sistema');
        }
    } catch(error) {
        console.log(error.message);
        res.status(400).json({message: `Acceso denegado: ${error.message}`});
    }
}

let validarAdministrador = async(req, res, next) => {
    let infoUsuario = req.params.usuario;
    let administrador = 1;
    try {
        if (infoUsuario.tipoUsuario == administrador){
            return next();
        } else {
            throw new Error ('No tiene permisos de Administrador');
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: `Acceso denegado: ${error.message}`});
    }
}

let validarAccesoUsuario = async(req, res, next) => {
    let infoUsuario = req.params.usuario;
    let administrador = 1;
    let usuarioComun = 2;
    try {
        if (infoUsuario.tipoUsuario == usuarioComun || infoUsuario.tipoUsuario == administrador){
            return next();
        } else {
            throw new Error ('No tiene permisos de Administrador');
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: `Acceso denegado: ${error.message}`});
    }
}

// Exportar los modulos
module.exports = {limiteConsultas, validarUsuario, validarAdministrador, validarAccesoUsuario}
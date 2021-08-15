// Importar los mudulos necesarios a utilizar
const Joi = require('joi');

// Exportar los modulos
module.exports = {
    modeloIniciarSesion : Joi.object().keys({
        correo: Joi.string().email().max(40).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,15}$/).min(8).required()
    }).with('correo','password'),

    modeloRegistro: Joi.object().keys({
        nombres: Joi.string().min(4).max(50).required(),
        apellidos: Joi.string().min(4).max(50).required(),
        correo: Joi.string().email().max(40).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,15}$/).min(8).required()
    })
}
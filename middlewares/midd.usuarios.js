// Importar los mudulos necesarios a utilizar
const rateLimit = require('express-rate-limit');

// Middleware para limitar el número de peticiones por usuario
const limiteConsultas = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Excedio el número de peticiones al servidor'
})

// Exportar los modulos
module.exports = {limiteConsultas}
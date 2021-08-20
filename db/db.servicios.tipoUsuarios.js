// Importar los modulos necesarios
const TipoUsuarios = require('./db.modelo.tipoUsuarios');

// Función para insertar valores en la tabla tipo de datos
let crearCredenciales = async(credencial) =>{
    try{
        let credencialRegistrada = await TipoUsuarios.findOne({where: {tipo_usuarios: `${credencial}`}});
        if(credencialRegistrada == null){
            TipoUsuarios.create({tipo_usuarios: credencial})
        }
    }catch(error) {
        console.log(`No se pudo registrar la credencial: ${error.message}`)
    }
}


let registrarTipoUsuarios = async() =>{
    try{
        let credenciales = ['Administrador','Usuario registrado', 'Usuario solicitante'];
        for(let tipo = 0; tipo < credenciales.length; tipo++){
            await crearCredenciales(credenciales[tipo]);
        }
    } catch(error) {
        console.log(`Ocurrio un error al registrar los tipos de usuarios: ${error}`)
    }
}

// Exportar modulos

module.exports = {registrarTipoUsuarios}
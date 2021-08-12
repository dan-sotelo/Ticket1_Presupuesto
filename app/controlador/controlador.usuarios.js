// Importar los mudulos necesarios a utilizar
const modeloUsuarios = require('../modelo/modelo.usuarios');
const jwt = require('jsonwebtoken')

// Definir los modulos
let nuevoRegistro = async(usuario) =>{
    try {
        usuario.estado = true;
        let nuevoUsuario = await modeloUsuarios.nuevoRegistro(usuario);
        return nuevoUsuario;
    } catch (error) {
        console.log(`Error en el controlador al registrar un nuevo usuario: ${error}`);
        throw new Error(error.message);
    }
}

let buscarUsuario = async(usuario) =>{
    try {
        let revisarIngreso = await modeloUsuarios.buscarUsuario(usuario);
        if (revisarIngreso){
            return revisarIngreso;
        } else {
            throw new Error('Usuario no valido')
        }
    } catch (error) {
        console.log(`Error en el controlador al buscar usuario: ${error}`);
        throw new Error(error.message);
    }
}

let generarToken = async(usuario) =>{
    try{
        const token = jwt.sign({usuario}, process.env.SECRET_KEY);  //Token con validación de 15 min
        return token;
    } catch (error) {
        console.log(`Error en el controlador al generar el token: ${error}`);
        throw new Error(error.message);
    }
}

let cambiarPassword = async(usuario) =>{
    try {
        const nuevaPassword = await modeloUsuarios.cambiarPassword(usuario);
    } catch (error) {
        console.log(`Error en el controlador al cambiar la password: ${error}`);
        throw new Error(error.message);
    }
}

let listarUsuarios = async() =>{
    try {
        let usuarios = await modeloUsuarios.listarUsuarios();
        return usuarios;
    } catch (error) {
        console.log(`Error en el controlador al listar usuarios: ${error}`);
        throw new Error(error.message);
    }
}

// Exportar los modulos
module.exports = {nuevoRegistro,buscarUsuario,generarToken,cambiarPassword,listarUsuarios}
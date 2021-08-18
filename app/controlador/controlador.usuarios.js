// Importar los mudulos necesarios a utilizar
const modeloUsuarios = require('../modelo/modelo.usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Definir los modulos
let nuevoRegistro = async(usuario) =>{
    try {
        usuario.activo = true;
        usuario.id_tipo_usuario = 2;
        let encriptacion = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password,encriptacion);
        let nuevoUsuario = await modeloUsuarios.nuevoRegistro(usuario);
        return nuevoUsuario;
    } catch (error) {
        console.log(`Error en el controlador al registrar un nuevo usuario: ${error}`);
        throw new Error(error.message);
    }
}

let buscarUsuario = async(usuario) =>{
    try {
        let infoUsuario = await modeloUsuarios.buscarUsuario(usuario);
        if (infoUsuario != null){
            return infoUsuario;
        } else {
            throw new Error('Usuario no valido')
        }
    } catch (error) {
        console.log(`Error en el controlador al buscar usuario: ${error}`);
        throw new Error(error.message);
    }
}

let generarToken = async(infoUsuario) =>{
    let usuario = {
        id_usuario: infoUsuario.id_usuario,
        correo: infoUsuario.correo,
        tipoUsuario: infoUsuario.id_tipo_usuario
    };
    try{
        const token = jwt.sign({usuario}, process.env.SECRET_KEY, {expiresIn: '1h'});  //Token con validación de 1 hora
        return token;
    } catch (error) {
        console.log(`Error en el controlador al generar el token: ${error}`);
        throw new Error(error.message);
    }
}

let verificarToken = async(token) =>{
    try {
        const validacion = jwt.verify(token, process.env.SECRET_KEY);
        if(validacion){
            return validacion;
        } else {
            throw new Error('Token no valido')
        }
    } catch (error) {
        console.log(`Error en el controlador al verificar el token: ${error}`);
        throw new Error(error.message);
    }
}

let cambiarPassword = async(usuario) =>{
    try {
        let encriptacion = await bcrypt.genSalt(10);
        usuario.nuevaPassword = await bcrypt.hash(usuario.nuevaPassword,encriptacion);
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
module.exports = {nuevoRegistro,buscarUsuario,generarToken,verificarToken,cambiarPassword,listarUsuarios}
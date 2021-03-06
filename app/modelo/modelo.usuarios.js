// Importar los mudulos necesarios a utilizar
const Usuarios = require('../../db/db.modelo.usuarios');
const bcrypt = require('bcrypt');

// Definir los modulos
let nuevoRegistro = async(usuario) =>{
    try {
        let existeUsuario = await Usuarios.findOne({where: {correo: `${usuario.correo}`}});
        if (existeUsuario == null){
            let nuevoUsuario = await Usuarios.create({
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                password: usuario.password,
                activo: usuario.activo,
                id_tipo_usuario: usuario.id_tipo_usuario
            });
            return nuevoUsuario;
        } else {
            throw new Error('Usuario ya registrado, por favor inicie sesión');
        }
    } catch (error) {
        console.log(`Error en el modelo al registrar al usuario: ${error}`);
        throw new Error(error.message);
    }
}

let buscarUsuario = async(usuario) =>{
    try {
        let infoUsuario = await Usuarios.findOne({where: {correo: `${usuario.correo}`}});
        if(infoUsuario != null){
            let validacionPass = await bcrypt.compare(usuario.password,infoUsuario.password);
            if(validacionPass){
                return infoUsuario;
            } else {
                console.log('La contraseña es incorrecta');
                throw new Error('La contraseña es incorrecta');
            }
        } else {
            console.log('Usuario no registrado');
            throw new Error('El usuario no esta registrado, revise su correo');
        }
    } catch (error) {
        console.log(`Error en el modelo al buscar usuario: ${error}`)
        throw new Error(error.message);
    }
}

let cambiarPassword = async(usuario) =>{
    try {
        let usuarioExistente = await Usuarios.findOne({where: {correo: `${usuario.correo}`}});
        if(usuarioExistente != null){
            let validarPasswordActual = await bcrypt.compare(usuario.actualPassword,usuarioExistente.password);
            if(validarPasswordActual){
                let nuevaPassword = await Usuarios.update({password: `${usuario.nuevaPassword}`}, {where: {correo: `${usuario.correo}`}});
            } else {
                console.log('Contraseña invalida');
                throw new Error('Contraseña invalida, por favor introduzca su contraseña actual');
            }
        } else {
            console.log('Usuario no registrado');
            throw new Error('Correo invalido, revise su correo');
        }
    } catch (error) {
        console.log(`Error en el modelo al cambiar la password: ${error}`)
        throw new Error(error.message);
    }
}

let listarUsuarios = async() => {
    try {
        let usuarios = await Usuarios.findAll();
        return usuarios;
    } catch (error) {
        console.log(`Error en el modelo al consultar la lista de usuarios: ${error}`)
        throw new Error(error.message);
    }
}

module.exports = {nuevoRegistro, buscarUsuario, listarUsuarios, cambiarPassword}
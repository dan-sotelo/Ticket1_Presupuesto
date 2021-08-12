// Importar los mudulos necesarios a utilizar
const Usuarios = require('../../db/db.modelo.usuarios');

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
                estado: usuario.estado
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
        let existeUsuario = await Usuarios.findOne({where: {correo: `${usuario.correo}`}});
        if(existeUsuario != null){
            let validacionPass = await Usuarios.findOne({where: {password: `${usuario.password}`, correo: `${usuario.correo}`}});
            if(validacionPass != null){
                return true;
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
        let existeUsuario = await Usuarios.findOne({where: {correo: `${usuario.correo}`}});
        if(existeUsuario != null){
            let validarPasswordActual = await Usuarios.findOne({where: {password: `${usuario.actualPassword}`, correo: `${usuario.correo}`}});
            if(validarPasswordActual != null){
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
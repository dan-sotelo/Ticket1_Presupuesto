// Función para realizar un inicio de sesion
let nuevoIngreso = async (usuario) => {
    try{
        let iniciarSesion = await fetch('http://localhost:3000/usuarios/iniciar_sesion', {
            method: 'post',
            headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        let respuesta = await iniciarSesion.json();
        console.log(respuesta);
        return respuesta;
    } catch(error) {
        console.log(error)
        throw new Error(error.message);
    }
}

let ingresoInicio = async() => {
    try {
        let token = await JSON.parse(localStorage.getItem('token'));
        let accesoInicio = await fetch('http://localhost:3000/inicio',{
            method: 'get',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}
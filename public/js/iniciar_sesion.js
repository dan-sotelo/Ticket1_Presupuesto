// Variables globales
let btnIniciarSesion = document.getElementById("login");

// Función para capturar los datos del usuario
btnIniciarSesion.addEventListener('click', async(e) =>{
    let usuario = {
        correo: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPassword').value
    }
    console.log(usuario)
    try {
        // e.preventDefault()
        let iniciarSesion = await nuevoIngreso(usuario);
        console.log(iniciarSesion.token)
        if(iniciarSesion.token){
            await localStorage.setItem('token',JSON.stringify(iniciarSesion.token));
            await ingresoInicio()
        } else {
            throw new Error ('Usuario invalido');
        }

    } catch (error) {
        console.log(error);
        alert(`Error: ${error.message}`);
    }
})
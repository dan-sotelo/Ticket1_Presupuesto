// Importar los mudulos necesarios a utilizar
const middUsuarios = require('../../middlewares/midd.usuarios');

// Declarar las rutas de navegacion y exportar los modulos
module.exports = async (app) => {
    app.get('/iniciar_sesion',async(req,res) => {
        try{
            res.render('iniciar_sesion');
        } catch(error){
            console.log(`Error al cargar la página: ${error}`);
            res.status(400).json(error.message);
        }
    });

    app.get('/inicio', middUsuarios.validarUsuario, middUsuarios.validarAccesoUsuario, async(req,res) =>{
        try{
            res.render('inicio');
        } catch(error){
            console.log(`Error al cargar la página: ${error}`);
            res.status(400).json(error.message);
        }
    })

    app.get('/presupuesto', async(req,res) =>{
        try{
            res.render('presupuestos');
        } catch(error){
            console.log(`Error al cargar la página: ${error}`);
            res.status(400).json(error.message);
        }
    })
}
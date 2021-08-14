// Importar los mudulos necesarios a utilizar
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const middUsuarios = require('./middlewares/midd.usuarios');
const sequelize = require('./db/db.conexion');
const Usuarios = require('./db/db.modelo.usuarios');
const TipoUsuarios = require('./db/db.modelo.tipoUsuarios');
const vistaApp = require('./app/vista/vista.app');
const vistaUsuarios = require('./app/vista/vista.usuarios');

// Middlewares globales
app.use(express.json());
app.use(cors());
app.use(middUsuarios.limiteConsultas);

// Configuraciones globales
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Inicializar el servidor
const iniciarServidor = async() =>{
    try {
        await TipoUsuarios.sync();
        await Usuarios.sync();
        await sequelize.authenticate();
        console.log('Se establecio una conexión exitosa con la DB');
        app.listen(process.env.PORT, () =>{
            console.log(`El servidor se ha iniciado correctamente en http://${process.env.HOST}:${process.env.PORT}`);
        })
    } catch (error) {
        console.log(`Error al realizar la conexión con la DB: ${error}`);
    }
}

iniciarServidor();

// Inicializar las rutas del servidor
vistaApp(app);
vistaUsuarios(app);
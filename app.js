// Importar los mudulos necesarios a utilizar
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const middUsuarios = require('./middlewares/midd.usuarios');

const sequelize = require('./db/db.conexion');
const TipoUsuarios = require('./db/db.modelo.tipoUsuarios');
const Usuarios = require('./db/db.modelo.usuarios');
const Proyectos = require('./db/db.modelo.proyectos');
const VersionPresupuestos = require('./db/db.modelo.versionesPresupuestos');
const ConceptoCostosAdministrativos = require('./db/db.modelo.conceptoCostosAdministrativos');
const ConceptoCostosDirectos = require('./db/db.modelo.conceptoCostosDirectos');
const ConceptoIngresos = require('./db/db.modelo.conceptoIngresos');
const RolRecursos = require('./db/db.modelo.rolRecusos');
const Periodos = require('./db/db.modelo.periodos');
const Ingresos = require('./db/db.modelo.ingresos');
const CostosDirectos = require('./db/db.modelo.costosDirectos');
const CostosAdministrativos = require('./db/db.modelo.costosAdministrativos');
const PorcentajeRecursos = require('./db/db.modelo.porcentajeRecursos');

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
        await Proyectos.sync();
        await VersionPresupuestos.sync();
        await ConceptoCostosAdministrativos.sync();
        await ConceptoCostosDirectos.sync();
        await ConceptoIngresos.sync();
        await RolRecursos.sync();
        await Periodos.sync();
        await Ingresos.sync();
        await CostosDirectos.sync();
        await CostosAdministrativos.sync();
        await PorcentajeRecursos.sync();
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
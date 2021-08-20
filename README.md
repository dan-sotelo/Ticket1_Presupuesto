# Ticket1_Presupuesto
En el presente repositorio se encuentra el desarrollo backend que permita generar presupuestos para proyectos TI. Para apreciar la funcionalidad del mismo, es necesario seguir los siguientes pasos:

* Paso 1. El primer paso consiste en clonar el presente repositorio, para ello, abra Visual Studio Code y seleccione la carpeta donde desee almacenar este repositorio, despúes abra la terminal de Visual Studio e introduzca los siguientes comandos:

        git init
        git clone https://github.com/dan-sotelo/Ticket1_Presupuesto.git

* Paso 2. Una vez que se ha clonado el repositorio, es necesario instalar los modulos empleados, para ello, es preciso introducir en la terminal el siguiente comando:

        npm install
    
* Paso 3. Después de clonar los modulos, es tiempo de crear un archivo .ENV dentro de la carpeta *Ticket1_Presupuesto* al mismo nivel que el archivo app.js, dentro del archivo .ENV introduzca lo siguiente:

        HOST = 'localhost
        PORT = '3000'
        
        DB_NAME = 'ticket01'
        DB_HOST = 'localhost'
        DB_PORT = '1433'
        DB_USER = 'Introduzca el nombre de usuario registrado en su motor de base de datos'
        DB_PASS = 'Introduzca la pasword registrada para acceder a su motor de base de datos'
        SECRET_KEY = 'iqX8L!!q@w1f'

    * Notas: 
        * El valor *DB_NAME* puede ser modificado a su gusto para nombrar una base de datos, asegurandose de no introducir espacios.
        * El valor *DB_PORT* se es
        * pecifico como 1433, debido a que el proyecto se trabajo con MSSQL como motor de base de datos, en caso de trabajar con un motor de base de datos diferente tendrá que modificar este valor, así como el del archivo *db.conexion.js* que se encuentra en la carpeta **db**, donde cambiara el valor de *dialect: 'mssql'* de acuerdo a su motor de base de datos.        
        * El valor *SECRET_KEY* puede ser modificado a su gusto, pero asegurese de introducir una password segura.

* Paso 4. Una vez creado el archivo .ENV, deberá crear una base de datos con ayuda de su motor de base de datos, cuyo nombre debe ser el mismo que especifico en *DB_NAME*, por ejemplo, desde SQL introduzca la siguiente instrucción:

        CREATE DATABASE ticket01

* Paso 5. Después de crear la base de datos, solo resta inicializar el servidor, para ello nuevamente dirijase a la terminal de VISUAL STUDIO CODE e introduzca el comando:

        npm run dev

Deberá esperar un breve momento hasta que en la terminal aparezcan los mensajes:

        Executing (default): SELECT 1+1 AS result
        Se establecio una conexión exitosa con la DB
        El servidor se ha iniciado correctamente en http://localhost:3000

# Rutas
Para poner a prueba los endpoints, así como sus diferentes métodos, se empleo la herramienta **Postman**. Para visulaizar la colección realizada, es necesario seguir los siguientes pasos: 
* 1. Abrir **Postman**
* 2. Dar click en **Collections**
* 3. Dar click en el boton **Import**, que se ubica a un costado del boton New
* 4. En la ventana que se abre, dar click en la pestaña **link**
* 5. Ingresar la suguiente url:

        https://www.getpostman.com/collections/a46451db103e26da861c
        
* 6. Dar click al botón **continue**

Despues de seguir estos pasos, podrá visualizar la colección realizada en **Postman** con nombre **Ticket01-DanielSotelo**, que posee dos carpetas, la primera llamada Usuarios, que alberga las rutas relacionadas a los usuarios como registro, inicio de sesión, cambio de password, etc. La segunda caprpeta cuenta con las rutas para registrar un nuevo presupuesto, listar la información general de los presupuestos registrados, actualizar un presupuesto, cargar la información completa de un presupuesto solicitado, y desactivar los presupuestos asociados a un proyecto

**Para porner a prueba las rutas**
* Para comenzar es necesa

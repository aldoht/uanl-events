# Guía de uso

## Ejecución de proyecto
1. Hay que descargar todos los zips, posteriormente crear una base de datos en sql server mediante Autenticación de Windows usando las consultas de *sqlQueries.zip*
2. Después, abrimos el proyecto de la *[API]*(https://github.com/aldoht/uanl-events-API) en Visual Studio y lo ejecutamos, se abrirá una ventana de un navegador con dirección http://localhost:58683, si no se inicia o no es ese puerto, el proyecto no funcionará
3. Seguido de ello, abrimos la terminal en la carpeta del proyecto de *Ionic y Angular*, nos aseguramos de tener instalado **Node.js** y **npm**, y posteriormente ejecutamos:
> npm install
3. Si esto no es suficiente, ejecute:
> npm install -g @angular/cli
> npm install -g @ionic/cli
3. Además, en cuanto a las funcionalidades de *Firebase*, sólo seleccione Authentication
4. Abrimos la página en local y ya accedemos a las funcionalidades

## Funcionalidades
+ Podemos iniciar sesión y registrarnos con un correo y contraseña en /home/login y /home/signup respectivamente, usando **FirebaseAuth**
+ Podemos añadir eventos y gestionarlos
+ Al dar clic a un evento, nos podemos registrar y accederemos a un código QR como boleto

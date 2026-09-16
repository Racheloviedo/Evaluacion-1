const express = require('express'); //importando la libreria express
const app = express(); //crear aplicacion express
const PORT = 3000; //definir el puerto del servidor

//Importar las rutas de incidencias
const incidenciaRoutes = require('./routes/incidencias');

//Middleware para procesar json recibido en los requests
app.use(express.json()); //para interpretar el formato json

//Registro de las rutas
app.use('/incidencias', incidenciaRoutes); //todasls rutas inician con '/incidencias'

//Servidor escuchando en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
});




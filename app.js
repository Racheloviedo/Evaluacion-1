const express = require('express');
const app = express();
const PORT = 3000;

//Importar el route de incidencias
const incidenciaRoutes = require('./routes/incidencias');
//Middleware para procesar json recibido en los requests
app.use(express.json());
//Registro de las rutas
app.use('/incidencias', incidenciaRoutes);
//Servidor escuchando en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
});
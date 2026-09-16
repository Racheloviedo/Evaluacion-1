const express = require('express');
const router = express.Router();
//Importando registrarIncidencia
const { registrarIncidencia } = require('../controllers/incidenciasController'); 
//Importando listarIncidencias
const { listarIncidencias } = require('../controllers/incidenciasController');

//Ruta POST para registrar incidencia
router.post('/', registrarIncidencia);
//Ruta GET para listar incidencias
router.get('/', listarIncidencias);

module.exports = router;

















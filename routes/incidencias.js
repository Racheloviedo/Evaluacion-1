const express = require('express');
const router = express.Router();
//Importando registrar incidencia
const { registrarIncidencia } = require('../controllers/incidenciasController'); 

//Ruta POST para registrar incidencia
router.post('/', registrarIncidencia);

module.exports = router;

















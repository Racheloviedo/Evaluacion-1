const express = require('express');
const router = express.Router();
//Importando registrarIncidencia
const { registrarIncidencia } = require('../controllers/incidenciasController'); 
//Importando listarIncidencias
const { listarIncidencias } = require('../controllers/incidenciasController');
//Importando buscarPorId
const { buscarPorId } = require('../controllers/incidenciasController');
const { cambiarEstado } = require('../controllers/incidenciasController');

//Ruta POST para registrar incidencia
router.post('/', registrarIncidencia);
//Ruta GET para listar incidencias
router.get('/', listarIncidencias);
//Ruta GET para buscar una incidencia
router.get('/:id', buscarPorId);
//Ruta PUT para cambiar el estado
router.put('/:id/estado', cambiarEstado);

module.exports = router;

















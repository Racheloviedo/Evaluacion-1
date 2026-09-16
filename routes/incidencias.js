const express = require('express');
const router = express.Router();
//Importando 
const { registrarIncidencia } = require('../controllers/incidenciasController'); 
const { listarIncidencias } = require('../controllers/incidenciasController');
const { buscarPorId } = require('../controllers/incidenciasController');
const { cambiarEstado } = require('../controllers/incidenciasController');
const { eliminarIncidencia } = require('../controllers/incidenciasController'); 
const { obtenerEstadisticas } = require('../controllers/incidenciasController');
const { obtenerClasificacion } = require('../controllers/incidenciasController');

//Definicion de endpoints
router.post('/', registrarIncidencia); //Ruta POST para registrar incidencia
router.get('/', listarIncidencias);
router.get('/:id', buscarPorId);
router.put('/:id/estado', cambiarEstado);
router.delete('/:id', eliminarIncidencia);
router.get('/estadisticas', obtenerEstadisticas);
router.delete('/:id', eliminarIncidencia);

module.exports = router;

















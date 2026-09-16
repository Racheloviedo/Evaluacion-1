const express = require('express');
const router = express.Router();
//Importando 
const { registrarIncidencia } = require('../controllers/incidenciasController'); 
const { listarIncidencias } = require('../controllers/incidenciasController');
const { buscarPorId } = require('../controllers/incidenciasController');
const { cambiarEstado } = require('../controllers/incidenciasController');
const { eliminarIncidencia } = require('../controllers/incidenciasController'); 
const { obtenerEstadisticas } = require('../controllers/incidenciasController');

//Ruta POST para registrar incidencia
router.post('/', registrarIncidencia);
//Ruta GET para listar incidencias
router.get('/', listarIncidencias);
//Ruta GET para buscar una incidencia
router.get('/:id', buscarPorId);
//Ruta PUT para cambiar el estado
router.put('/:id/estado', cambiarEstado);
//Ruta DELETE para eliminar incidencia
router.delete('/:id', eliminarIncidencia);
//Ruta GER para estadisticas
router.get('/estadisticas', obtenerEstadisticas);

module.exports = router;

















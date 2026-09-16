//Definicion de las rutas/endpoints 

const express = require('express'); // importando express para crear el router

const router = express.Router(); //crea el router

//Importando funciones de incidenciasController
const { 
    registrarIncidencia,
    listarIncidencias,
    buscarPorId,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
     } = require('../controllers/incidenciasController'); 

//Definicion de endpoints
router.get('/', listarIncidencias); //Obtener lista de incidencias
router.get('/estadisticas', obtenerEstadisticas); //Obtener estadisticas
router.get('/:id', buscarPorId); //Obtener incidencia especifica
router.get('/:id/clasificacion', obtenerClasificacion); //Obtener clasificacion de incidencia
router.post('/', registrarIncidencia); //Crear incidencia
router.put('/:id/estado', cambiarEstado); //Actualizar estado de incidencia
router.delete('/:id', eliminarIncidencia); //Eliminar incidencia

//Exportando el router
module.exports = router;

















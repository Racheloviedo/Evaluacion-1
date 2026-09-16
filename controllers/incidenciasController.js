//Importando funiones auxiliares de helper.js
const { limpiarTexto, estaVacio } = require('../utils/helpers');

//Se establece toda la logica de negocio
const incidencias = [];
//Variable autoincremental para controlar los IDs
let siguienteId = 1;

//2. Metodo registrar incidencia
const registrarIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad} = req.body;

    //Validar los campos obligatorios y que no esten vacios
    if(estaVacio(empleado) || estaVacio(area) || estaVacio(descripcion) || estaVacio(prioridad)){
        return res.status(400).json({ error: 'Todos los campos son obligatorios y no se permiten cadenas vacias'});
    }

    //Limpieza de datos
    const empleadoLimpio = limpiarTexto(empleado);
    const areaLimpia = limpiarTexto(area);
    const descripcionLimpia = limpiarTexto(descripcion);
    const prioridadLimpia = limpiarTexto(prioridad);

    //Validar que prioridad sea: Alta, Media o Baja
    const prioridadLower = prioridadLimpia.toLowerCase() //pasar a minuscula para evitar errores del usuario
    if(prioridadLower != 'alta' && prioridadLower != 'media' && prioridadLower != 'baja'){
        return res.status(400).json({ error: "Prioridad invalidad. Los valores permitidos son: 'Alta', 'Media' o 'Baja'"});
    }

    //Normalizando texto --> en caso de que el usuario no lo mande en mayuscula
    let prioridadNormalizada = "Baja";
    if (prioridadLower === 'alta') prioridadNormalizada = "Alta";
    if(prioridadLower === 'media') prioridadNormalizada = "Media";

    //Crear objeto
    const nuevaIncidencia = {
    empleado: empleadoLimpio,
    area: areaLimpia,
    descripcion: descripcionLimpia,
    prioridad: prioridadNormalizada,
    estado: "Pendiente" //Estado por defecto
  };
    // usamos push para insertar en el arreglo
    incidencias.push(nuevaIncidencia);
    res.status(201).json({mensaje: 'Incidencia registrada correctamente'}); // 201 --> el recurso se creo y fue exitoso
};
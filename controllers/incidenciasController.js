//Importando funiones auxiliares de helper.js
const { limpiarTexto, estaVacio } = require('../utils/helpers');

//Se establece toda la logica de negocio
const incidencias = [];
//Variable autoincremental para controlar los IDs
let siguienteId = 1;

//Metodo registrar incidencia
const registrarIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad} = req.body;

    //Validar los campos obligatorios y que no esten vacios
    if(estaVacio(empleado) || estaVacio(area) || estaVacio(descripcion) || estaVacio(prioridad)){
        return res.status(400).json({ error: 'Todos los campos son obligatorios y no se permiten cadenas vacias'});
    }

    //Limpieza de espacios en blanco
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
    res.status(201).json({mensaje: "Incidencia registrada correctamente" }); // 201 --> el recurso se creo y fue exitoso
};

//Listar incidencias
const listarIncidencias = (req, res) => {
    return res.status(200).json(incidencias); //devuelve el arreglo con todos los registros almacenados
};

//Buscar incidencia por el ID
const buscarPorId = (req, res) => {
    const id = Number(req.params.id); //Debemos convertir de string a un numero

    const incidencia = incidencias.find(inc => inc.id === id); //recorre el arreglo para encontrar coincidencia con el id
    
    if(incidencia){
        return res.status(200).json(incidencia);
    } else {
        return res.status(400).json({ mensaje:"Incidencia no encontrada" });
    }
};

//Cambiar el estado de incidencia
const cambiarEstado = (req, res) => {
    const id = Number(req.params.id);
    const { estado } = req.body;

    if (estaVacio(estado)) {
        return res.status(400).json({ mensaje: "El campo 'estado' es obligatorio" });
    }

    const incidencia = incidencias.find(inc => inc.id === id);

    if(!incidencia){
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const estadoLimpio = limpiarTexto(estado);
    
    //Swirch para elegir estado de la incidencia
    switch (estadoLimpio) {
        case "Pendiente":
        case "En proceso":
        case "Resuelta":
        case "Cancelada":
            incidencia.estado = estadoLimpio;
            return res.status(200).json({ mensaje: "Estado actualizado correctamente", incidencia });
        default:
            return res.status(400).json({ mensaje: "Estado no valido. Los estados permitidos son: 'Pendiente', 'En Proceso', 'Resuelta' o 'Cancelada'" });
    }
};

//Eliminar una incidencia 
const eliminarIncidencia = (req, res) => {
    const id = Number(req.params.id);
    //findIndex() -> retorna el valor del primer elemento del array
    const index = incidencias.findIndex(inc => inc.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    //splice() -> usado para agregar nuevos items al array
    incidencias.splice(index, 1); //modifica el array borrando 1 elemento a partir del index
    return res.status(200).json({ mensaje: "Incidencia eliminada correctamente" });
};

//Endpoint de estadisticas
const obtenerEstadisticas = (req, res) => {
    const estadisticas = {
        totalIncidencias: incidencias.length, //length() -> cantidad de elementos en el array
        pendientes: 0,
        enProceso: 0,
        resueltas: 0,
        canceladas: 0
    };

    //Recorrido dinamico que evite variables manuales por resultado
    incidencias.forEach(inc => {
        switch(inc.estado){
            case "Pendiente":
                estadisticas.pendientes++;
                break;
            case "En proceso":
                estadisticas.enProceso++;
                break;
            case "Resuelta":
                estadisticas.resueltas++;
                break;
            case "Cancelada":
                estadisticas.canceladas++;
                break;
        }
    });

    return res.status(200).json(estadisticas);
};

//Clasificacion automatica 
const obtenerClasificacion = (req, res) => {
    const id = Number(req.params.id);
    const incidencia = incidencias.find(inc => inc.id === id);

    if (!incidencia){
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    let clasificacion = "";

    //Switch de clasificacion automatica
    switch (incidencia.prioridad){
        case "Alta":
            clasificacion = "Critica";
            break;
        case "Media":
            clasificacion = "Importante";
            break;
        case "Baja":
            clasificacion = "Normal";
            break;
        default:
            clasificacion = "Desconocida";
            break;
    }

    return res.status(200).json({
        id: incidencia.id,
        clasificacion: clasificacion
    });
};

//Exportar funciones controladoras
module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarPorId,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
};









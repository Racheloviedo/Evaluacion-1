//Para almacenar funciones reutilizables

//Limpiar espacios en blanco al inicio y final de un texto.
const limpiarTexto = (texto) => {
    if (typeof texto === 'string'){ //verificamos con typeof que sea string
        return texto.trim();//trim() remueve los espacios en blanco de ambos lados de un string.
    }
    return texto;
};

//Validar si un valor esta vacio o si solo tiene espacios
const estaVacio = (valor) => {
    if (valor === undefined || valor === null){//verificar que sea indefinido o nulo
        return true;
    }
    if (typeof valor === 'string' && valor.trim() === ''){ //verificar que valor sea un string y si queda "" tras usar trim()
        return true;
    }
    return false; //si no cumple nada de eso, no esta vacio 

};

//Exportando funciones
module.exports = {
    limpiarTexto,
    estaVacio
};









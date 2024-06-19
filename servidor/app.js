const saludar = require('./modulos_funcionales/saludo')
const operar = require('./modulos_funcionales/operaciones')
const {multiplicar} = require('./modulos_funcionales/operaciones')
const fs = require('fs')

let inicio = 100
let fin= 200
let aniosTotales = operar.sumar(inicio,fin)
let aniosMultiplicados = multiplicar(inicio,fin)
console.log("Estos son los años totales " + aniosTotales);
console.log("Estos son los años multiplicados : " + aniosMultiplicados);
console.log(operar.sumar(inicio,fin));
console.log(operar.restar(fin,inicio));
console.log(operar.multiplicar(inicio,fin));
console.log(operar.dividir(inicio,fin));
console.log(operar.numeros);
console.log(saludar('Miguel'));

console.warn("Por favor incluir el nombre");
console.error(new Error("El divisor no puede ser cero"));
console.table(operar.numeros)

/*
setTimeout(operar.sumar, 2, 5, 3);
console.log("antes de setInmediate");
setImmediate(operar.sumar, 30, 23);
console.log("después de setImmediate");
//console.log(setInterval(operar.sumar, 2, operar.sumar(operar.sumar(2,5),3),3));*/

fs.writeFileSync('./modulos_funcionales/archivo.txt', 'Hola mundo ', function(err){
    if(err){
        console.log(err);
    } else{
        console.log('El archivo fue creado');
    }
})

fs.readFileSync('./modulos_funcionales/archivo.txt', function(error, contenido){
    if(error){
        console.log(error);
    } else{
        console.log(contenido.toString());
    }
})

fs.rename('./modulos_funcionales/archivo.txt','./modulos_funcionales/archivo_nuevo.txt',
    function(error){
        if(error){
            console.log(error);
        } else {
            console.log("El archivo fue renombrado");
        }
    }
)
fs.readFileSync('./modulos_funcionales/archivo_nuevo.txt', function(error, contenido){
    if(error){
        console.log(error);
    } else{
        console.log("contenido con nuevo archivo: " + contenido.toString());
    }
})
fs.appendFileSync('./modulos_funcionales/archivo_nuevo.txt', " /n nuevo texto adicional al archivo"
    , function (error){
        if(error){
            console.log(error);
        } else {
            console.log("El archivo fue modificado");
        }
    }
 )
 fs.unlink('./modulos_funcionales/archivo_nuevo.txt', function(error){
    if(error){
        console.error('Error al eliminar');
    } else{
        console.log("Archivo eliminado correctamente");
    }
 })
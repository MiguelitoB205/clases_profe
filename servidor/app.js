const saludar = require('./modulos_funcionales/saludo')

function sumar(a,b){
    let resultado;
    resultado=a+b;
    return resultado;
}
console.log(sumar(10,35));
console.log(saludar('Miguel'));
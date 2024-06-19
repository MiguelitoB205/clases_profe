function sumar(a,b){
    let resultado=a+b
    return resultado
}
function restar(a,b){
    let resultado=a-b
    return resultado
}
function multiplicar(a,b){
    let resultado=a*b
    return resultado
}
function dividir(a,b){
    let resultado=a/b
    return resultado
}
const numeros =[2,5,6,70,9,1]
module.exports={sumar:sumar, restar:restar, multiplicar:multiplicar,
    dividir:dividir, numeros:numeros
}

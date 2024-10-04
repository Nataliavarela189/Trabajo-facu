//importo todos los archivos que voy a usar

import { match } from 'assert'
import {readFile} from 'fs/promises'//modulo reservado de js 'fs'

//ruta para acceder al archivo json guardado en una constante
const rutaArchivo = './data/personas.json'

/*funcion para leer el archivo con ASYNC y AWAIT demoro el 
proceso hasta que cargue todo el archivo. Con TRY 'intento' ejecutar
el codigo con CATCH capturo errores. La funcion reservada de js READFILE
me permite leer el archivo. Con JSON.PARSE transformo el texto plano del archivo
personas, a objrtos ejecutables por js, por ultimo 
imprimo ambas con CONSOLE.LOG*/
async function leerArchivo(){
    try{
    const data = await readFile(rutaArchivo, 'utf8')
    const personas = JSON.parse(data)
    console.log(personas)
    
    /*creo un objeto con los atributos nombre, apellido y edad.
Con persona.map meto los objetos transformados previamente en un vector*/
const objetos = personas.map(persona =>({
    nombre : persona.nombre,
    apellido : persona.apellido,
    edad : persona.edad
}))

//PROMEDIO
//creo una variable que guarda la  suma de las edades 
let sumaEdades = 0

/*Con forEach simulo un ciclo for sin inicio ni condicion
recorro cada atributo 'persona.edad' de 'persona' del objeto 'objetos' 
y sumo las edades. =>(abreviacion de una funcion)*/
objetos.forEach(persona => {
    sumaEdades += persona.edad
})

/*creo una variable que guarda el promedio. Math.round es una funcion de js
que redondea el calculo matematico al entero mas cercano*/
const promedioEdades = Math.round(sumaEdades / objetos.length) 

//imprimo el promedio
console.log('El promedio de las edades es: ' , promedioEdades)

/*Encontramos la persona más joven con la funcion objetos.reduce no da el minimo
del atributo persona.edad del objeto objetos*/
const personaMasJoven = objetos.reduce((masJoven, persona) => {
    return (masJoven.edad < persona.edad) ? masJoven : persona;
})

//imprimo el resultado
console.log("La persona más joven es:", personaMasJoven.nombre, personaMasJoven.apellido)

/*con filter filtramos de persona el apellido y con touppercase transformamos las minusculas
en mayusculas y comparamos que sea igual a GOMEZ*/
const pGomez = objetos.filter(persona => persona.apellido.toUpperCase() === 'GOMEZ')

//del vector pGomez con .map generamos un nuevo vector con los atributos nombre y lo ordena
const pOrdenada = pGomez.map(persona => persona.nombre).sort()

//imprimo los nombres solos y con el metodo Join (en este caso) le agrego una coma entre c/u
console.log("los nombres de las personas con apellido GOMEZ son: ", pOrdenada.Join(", "))
   

} catch (error) {
    console.error('no pudo leer el archivo', error)
    }
}
//llamo a la funcion para leer el archivo
leerArchivo()





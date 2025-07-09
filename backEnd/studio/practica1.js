/* import { readSync } from "fs";
import { Collection } from "mongoose";

function sumarNumeros(num1: number, num2: number): number {
    return num1 + num2;
}

console.log(sumarNumeros(5, 10));

console.log("Siguiente Ejercicio. Eje.2");

function esPar(num: number): string {
    if (num % 2 === 0) {
        return "Par";
    } else {
        return "Impar";
    }
};

console.log(esPar(4));

console.log("Siguiente Ejercicio. Eje.3");

interface Usuario {
    nombreUsuario: string;
    edadUsuario: number;
    email: string;
}

function registrarUsuario(): string {
    const usuario: Usuario = {
        nombreUsuario: "Manuel",
        edadUsuario: 19,
        email: "manuel@gmail.com"
    };

    return `Usario ${usuario.nombreUsuario}, con la edad de ${usuario.edadUsuario} y con el correo ${usuario.email} registrado con exitó`;
}

console.log(registrarUsuario())

console.log("Siguiente Ejercicio. Eje.4");

let nombres: string[] = ["Manuel", "Pedro", "Luis"];

function buscarElemento(lista: string[], elemento: string): boolean {
    return lista.includes(elemento);
};

console.log(buscarElemento(nombres, "Pepe"));
console.log(buscarElemento(nombres, "Manuel"));


console.log("Siguiente Ejercicio. Eje.5");

function login(email: string, password: string): boolean {
    if (email === "manuel@gmail.com" && password === "1234") {
        console.log(`Inicio de sesión exitoso`)
        return true;
    } else {
        console.log(`Contraseña o email incorrecto`)
        return false;
    }
}

console.log(login("manuel@gmail.com", "1234"));


console.log("Siguiente Ejercicio. Eje.6");

function calcularPromedio(promedio: number[]): number {
    let suma = promedio.reduce((total, califiacion) => total + califiacion, 0);
    return suma / promedio.length;
}

console.log(calcularPromedio([70, 80, 90]));

console.log("Siguiente Ejercicio. Eje.7");

let nombreLista: string[]

function NombreExistente(): boolean {
    nombreLista = ["Manuel", "Pedro", "Luis"]
    if (nombreLista.includes("Maniel")) {
        return true
    } else {
         return false
    }
};

console.log(NombreExistente());


console.log("Siguiente Ejercicio. Eje.8");

function SumaTotal(numberList: number[]): number {
    return numberList.reduce((a,b) => a + b, 0);
    
};

console.log(SumaTotal([5,10,15]));


console.log("Siguiente Ejercicio. Eje.9");

function Aprobados(califs: number[]): number[] {
    return califs.filter(cal => cal >= 70);
}

console.log(Aprobados([60,70,80,50,90]));


console.log("Siguiente Ejercicio. Eje.10");

function Duplicar(DuplicarArreglo: number[]): number[] {
    return DuplicarArreglo.map(numeroAduplicar => numeroAduplicar * 9);
}

console.log(Duplicar([1,2,3]));


console.log("Siguiente Ejercicio. Eje.11");

function EdadesArreglo(edadPromedio: number[]): number[] {
    let edadFinal = edadPromedio.filter(edadMayor => edadMayor >= 18);
    let SumaYPromedioEdad = edadFinal.reduce((edadActual, edadNueva) => edadActual + edadNueva,0);
    return edadFinal / SumaYPromedioEdad.lenght;
};

console.log(EdadesArreglo([18,17,20,90,30,14,1,36,3,12]))

 */
//📌 Dado un arreglo de edades, filtra las mayores de edad (>=18) y devuelve su promedio.
/*
function arregloEdades(mayoresEdad: number[]): number[] {
    return mayoresEdad.filter((edadActual => edadActual >= 18));
};

let total = arregloEdades([18,17,20,90,30,14,1,36,3,12]);

function EdadPronedio(total: number[]): number {
    let promedioEdad = total.reduce((edad, edad2) => edad + edad2, 0);
    return promedioEdad / total.length;
}

console.log(EdadPronedio(total)) */
/* 📦 Ejercicio 1: map + filter combinados
📌 Problema:
Dado un arreglo de sueldos,
👉 Filtra solo los sueldos mayores o iguales a $8000,
👉 Y súmales un bono de $500 a cada uno usando map.
👉 Devuelve el nuevo arreglo con los sueldos bonificados.

Entrada: [5000, 12000, 3000, 8000, 10000]
Salida: [12500, 8500, 10500] */
/* function arregloSueldos(sueldos: number[]): number[] {
    const sueldosMayores = sueldos.filter(sueldoSuma => sueldoSuma >= 8000);
    
    const sueldoBono = sueldosMayores.map(sueldoAnterior => sueldoAnterior + 500);

    return sueldoBono;
}

console.log(arregloSueldos([5000,12000,3000,8000,10000])); */
/* interface Register {
    nombre: string;
    edad: number;
    email: string;
}

function registrarUsuario(register: Register): string {
    if (register.edad>=18) {
        return `El usuario ${register.nombre} se registro con exitó`;
    } else {
        return `El usuario ${register.nombre} no se puede registrar`;
    }
};

console.log(registrarUsuario({
        nombre: "manuel",
        edad: 17,
        email: "sdasd"
    }
)); */
function par(espar) {
    if (espar % 2 === 0) {
        return "Par";
    }
    else {
        return "Impar";
    }
}
console.log(par(3));

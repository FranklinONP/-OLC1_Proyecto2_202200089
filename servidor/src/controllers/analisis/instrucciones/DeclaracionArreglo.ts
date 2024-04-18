import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";    
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Arreglo from '../simbolo/Arreglo'

export default class DeclaracionArreglo extends Instruccion {
    //private identificador: string
    //let heroes: string[];
    private identificador: string;
    private valor: Instruccion[]
    private tamano: number


    constructor(tipo: Tipo, linea: number, col: number, id: string , valor: Instruccion[],tamano: number) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
        this.tamano = tamano
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.valor == null) {
             switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    ///pasa algo
                    let arregloVacio: number[] = Array.from(Array(this.tamano));
                    console.log("=============Tamano de Arreglo================")
                    console.log("Tamano Entrando: "+this.tamano)
                    console.log(arregloVacio.length)
                    console.log(arregloVacio)
                    console.log("==============================================")

                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador, arregloVacio, this.tamano))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    }  
                case tipoDato.CADENA:
                    ///pasa algo
                    let arregloVacio2: string[] = new Array(this.tamano);

                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador, arregloVacio2, this.tamano))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    }  
                case tipoDato.CARACTER:
                    ///pasa algo
                    let arregloVacio3: string[] = new Array(this.tamano);

                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador, arregloVacio3, this.tamano))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    }
             }
        } else {
            switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:


                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador,this.valor,0))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    } 
                                        
                    console.log("=========================================")
                    this.valor.forEach(elemento => {
                        console.log(elemento);

                    });
                case tipoDato.CADENA:
                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador,this.valor,0))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    } 
                    console.log("=========================================")
                    this.valor.forEach(elemento => {
                        console.log(elemento);

                    });

        }

    }
}}
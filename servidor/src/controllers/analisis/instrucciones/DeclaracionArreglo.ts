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
                    let arregloVacio: number[] = new Array(this.tamano);
                    let arreglo: number[] = new Array(5);


                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setArreglo(new Arreglo(this.tipoDato,this.identificador, arregloVacio, this.tamano))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    }  
                    
                    console.log("===========ESTATICO=============")
                    console.log(arregloVacio);
                    console.log("---------------------------------")
                    console.log(arreglo);
                    console.log("=========================================")



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
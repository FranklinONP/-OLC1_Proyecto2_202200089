import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";    
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Matriz from '../simbolo/Matriz'

export default class DeclaracionMatriz extends Instruccion {
    //private identificador: string
    //let heroes: string[];
    private identificador: string;
    private valor: Instruccion[][]
    private pos1: number
    private pos2: number


    constructor(tipo: Tipo, linea: number, col: number, id: string , valor: Instruccion[][],pos1:number, pos2:number) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
        this.pos1 = pos1
        this.pos2 = pos2
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.valor == null) {
             switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    ///pasa algo
                    //let arregloVacio: number[][] = new Array<Array<number>>(this.tamano);
                    //let arregloVacio: number[][] = Array.from(Array(this.pos1,this.pos2));
                  //let lista2dvacia: number[][] = Array.from(Array(this.row), () => Array(this.column));
                    let arregloVacio: number[][] = Array.from(Array(5), () => Array(5));
                    console.log("Dec de Matriz solo con logitud " + this.pos1 + "," + this.pos2)
                    console.log(arregloVacio)
                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setMatriz(new Matriz(this.tipoDato,this.identificador, arregloVacio, this.pos1,this.pos2))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    }  
             }
        } else {
            switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:


                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setMatriz(new Matriz(this.tipoDato,this.identificador,this.valor,0,0))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    } 
                                        
                    console.log("=========================================")
                    this.valor.forEach(elemento => {
                        console.log(elemento);

                    });
                case tipoDato.CADENA:
                    //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setMatriz(new Matriz(this.tipoDato,this.identificador,this.valor,0,0))){
                        return new Errores("SEMANTICO", "No se puede declarar el arreglo porque ya existia", this.linea, this.col)
                    } 
                    console.log("=========================================")
                    this.valor.forEach(elemento => {
                        console.log(elemento);

                    });

        }

    }
}}
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class Declaracion extends Instruccion {
    //private identificador: string
    //let heroes: string[];
    private identificador: string[];
    private valor: Instruccion
    private funcion: string

    constructor(tipo: Tipo, linea: number, col: number, id: string [], valor: Instruccion,funcion:string) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
        this.funcion = funcion
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.valor == null) {
             switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    ///pasa algo
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, 0))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.DECIMAL:
                    ///pasa algo
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, 0.0))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.BOOL:
                    ///pasa algo
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, true))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.CARACTER:
                    ///pasa 
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                        //Para mientras un 0
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, "0"))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.CADENA:
                    ///pasa algo
                    this.identificador.forEach(elemento => {
                        //Aca debe ir el ciclo para setear a los ids que traiga
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, ""))){
                        return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                    }   
                    });
                case tipoDato.VOID:
                    ///pasa algo
                    console.log("No se puede declarar una variable de tipo void")
             }
        } else {
            let valorFinal = this.valor.interpretar(arbol, tabla)
            if (valorFinal instanceof Errores) return valorFinal

            if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
                return new Errores("SEMANTICO", "No se puede declarar variable", this.linea, this.col)
            }

            this.identificador.forEach(elemento => {
                    //Aca debe ir el ciclo para setear a los ids que traiga
            if(this.funcion == "toLower"){
                valorFinal = valorFinal.toString().toLowerCase()
            }else if(this.funcion == "toUpper"){
                valorFinal = valorFinal.toString().toUpperCase()
            }
            if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
            }   
            });
        }

    }
}
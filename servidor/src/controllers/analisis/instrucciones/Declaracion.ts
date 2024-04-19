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

    constructor(tipo: Tipo, linea: number, col: number, id: string [], valor: Instruccion) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //Valor por default
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
                    return new Errores("SEMANTICO", "No se puede declarar una variable de tipo void", this.linea, this.col)
                    
             }
        }
        //Asignacion normal
        else {
            let valorFinal = this.valor.interpretar(arbol, tabla)

            if (valorFinal instanceof Errores) return valorFinal

            this.identificador.forEach(elemento => {
                if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                    return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.col)
                }   
            });
        }

    }
}
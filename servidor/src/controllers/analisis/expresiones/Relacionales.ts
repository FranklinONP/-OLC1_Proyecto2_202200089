import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Relacionales extends Instruccion {
    private cond1: Instruccion
    private cond2: Instruccion
    private relacional: Relacional

    constructor(relacional: Relacional, relacional1: Instruccion, relacional2: Instruccion, fila: number, col: number) {
        super(new Tipo(tipoDato.BOOL), fila, col)
        this.cond1 = relacional1
        this.cond2 = relacional2
        this.relacional = relacional
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let conIzq = this.cond1.interpretar(arbol, tabla)
        if (conIzq instanceof Errores) return conIzq

        let conDer = this.cond2.interpretar(arbol, tabla)
        if (conDer instanceof Errores) return conDer

        switch (this.relacional) {
            case Relacional.MENOR:
                return this.menor(conIzq, conDer)
            default:
                return new Errores("SEMANTICO", "Operador relacional invalido", this.linea, this.col)
        }
    }

    menor(comp1: any, comp2: any) {
        let comparando1 = this.cond1.tipoDato.getTipo()
        let comparando2 = this.cond2.tipoDato.getTipo()

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) < parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseInt(comp1) < parseFloat(comp2)
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) < parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) < parseFloat(comp2)
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
        }
    }

}

export enum Relacional {
    MENOR

}
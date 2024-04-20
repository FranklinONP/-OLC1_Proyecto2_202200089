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
            case Relacional.IGUALIGUAL:
                return this.igual(conIzq, conDer)
            case Relacional.DIFERENTE:
                return this.diferente(conIzq, conDer)
            case Relacional.MENOR:
                return this.menor(conIzq, conDer)
            case Relacional.MENORIGUAL:
                return this.menorIgual(conIzq,conDer)
            case Relacional.MAYOR:
                return this.mayor(conIzq,conDer)
            case Relacional.MAYORIGUAL:
                return this.mayorIgual(conIzq,conDer)
            default:
                return new Errores("SEMANTICO", "Operador relacional invalido", this.linea, this.col)
        }
    }
    igual(comp1: any, comp2: any) {
        let comparando1 = this.cond1.tipoDato.getTipo()
        let comparando2 = this.cond2.tipoDato.getTipo()

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) == parseInt(comp2)
                //Pendiente en preguntar
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) == parseFloat(comp2)
                //Pendiente a preguntar
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.CADENA:
                switch (comparando2) {
                    case tipoDato.CADENA:
                        return comp1 == comp2
                //Pendiente a preguntar
                    default:
                        new Errores("SEMANTICO", "Relacional    Invalida", this.linea, this.col)
                }
        }
    }
    diferente(comp1: any, comp2: any) {
        let comparando1 = this.cond1.tipoDato.getTipo()
        let comparando2 = this.cond2.tipoDato.getTipo()

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) != parseInt(comp2)
                //Pendiente a preguntar
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) != parseFloat(comp2)
                    //Pendiente a preguntar
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.CADENA:
                switch (comparando2) {
                    case tipoDato.CADENA:
                        return comp1 != comp2
                    //Pendiente a preguntar
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
        }
    }
    menor(comp1: any, comp2: any) {
        let comparando1 = this.cond1.tipoDato.getTipo()
        let comparando2 = this.cond2.tipoDato.getTipo()

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        console.log("-----------------------------------------------")
                        return parseInt(comp1) < parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseInt(comp1) < parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseInt(comp1) < parseInt(comp2.charCodeAt(0)) 
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) < parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) < parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseFloat(comp1) < parseFloat(comp2.charCodeAt(0)   )
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.CARACTER:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1.charCodeAt(0)) < parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1.charCodeAt(0)) < parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseInt(comp1.charCodeAt(0)) < parseInt(comp2.charCodeAt(0)   )
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
        }
    }
    menorIgual(comp1: any, comp2: any){        
        let comparando1 = this.cond1.tipoDato.getTipo()
        let comparando2 = this.cond2.tipoDato.getTipo()

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) <= parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseInt(comp1) <= parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseInt(comp1) <= parseInt(comp2.charCodeAt(0)) 
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) <= parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) <= parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseFloat(comp1) <= parseFloat(comp2.charCodeAt(0)   )
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.CARACTER:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1.charCodeAt(0)) <= parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1.charCodeAt(0)) <= parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseInt(comp1.charCodeAt(0)) <= parseInt(comp2.charCodeAt(0)   )
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
        }

    }
    mayor(comp1: any, comp2: any){
        let comparando1 = this.cond1.tipoDato.getTipo()
        let comparando2 = this.cond2.tipoDato.getTipo()

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) > parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseInt(comp1) > parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseInt(comp1) > parseInt(comp2.charCodeAt(0)) 
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) > parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) > parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseFloat(comp1) > parseFloat(comp2.charCodeAt(0)   )
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.CARACTER:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1.charCodeAt(0)) > parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1.charCodeAt(0)) > parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseInt(comp1.charCodeAt(0)) > parseInt(comp2.charCodeAt(0)   )
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            }
        }
        mayorIgual(comp1: any, comp2: any){
            let comparando1 = this.cond1.tipoDato.getTipo()
        let comparando2 = this.cond2.tipoDato.getTipo()

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) >= parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseInt(comp1) >= parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseInt(comp1) >= parseInt(comp2.charCodeAt(0)) 
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) >= parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) >= parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseFloat(comp1) >= parseFloat(comp2.charCodeAt(0)   )
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            case tipoDato.CARACTER:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1.charCodeAt(0)) >= parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1.charCodeAt(0)) >= parseFloat(comp2)
                    case tipoDato.CARACTER:
                        return parseInt(comp1.charCodeAt(0)) >= parseInt(comp2.charCodeAt(0)   )
                    default:
                        new Errores("SEMANTICO", "Relacional Invalida", this.linea, this.col)
                }
            }
        
        }

}

export enum Relacional {
    IGUALIGUAL,
    DIFERENTE,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL

}
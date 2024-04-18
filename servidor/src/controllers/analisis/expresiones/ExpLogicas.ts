import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";

export default class ExpLogicas extends Instruccion {
    private operando1: Instruccion | undefined
    private operando2: Instruccion | undefined
    private logico: Logico
    private operandoUnico: Instruccion | undefined

    constructor(Oplogic: Logico, fila: number, col: number, op1: Instruccion, op2?: Instruccion) {
        super(new Tipo(tipoDato.BOOL), fila, col)
        this.logico = Oplogic
        if (!op2) this.operandoUnico = op1
        else {
            this.operando1 = op1
            this.operando2 = op2
        }
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let opIzq, opDer, Unico = null        //variables que me sirven para guardar el valor interpretado
        if (this.operandoUnico != null) {
            //al hacer esto de interpretar nos va a permitir ir bajando hasta que encuentre la hoja y luego subira 
            Unico = this.operandoUnico.interpretar(arbol, tabla)    //en error revisamos la semantica
            if (Unico instanceof Errores) return Unico              //retornamos el error si es el caso
        } else {
            console.log("entro a logico")
            console.log(this.operando1)
            console.log("============")
            opIzq = this.operando1?.interpretar(arbol, tabla)
            console.log(opIzq)
            console.log("============")
            if (opIzq instanceof Errores) return opIzq
            opDer = this.operando2?.interpretar(arbol, tabla)
            if (opDer instanceof Errores) return opDer
        }

        switch (this.logico) {
            case Logico.OR:
                return this.or(opIzq, opDer)
            case Logico.AND:
                return this.and(opIzq, opDer)
            case Logico.NOT:
                return this.not(Unico)
            default:
                return new Errores("Semantico", "Operador Logico Invalido", this.linea, this.col)
        }
    }

    or(op1: any, op2: any) {
        //validamos que el tipo cumpla con lo requerido 
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.BOOL:
                switch (tipo2) {
                    //unico caso si el primero es bool y el segundo es bool
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (op1 || op2) {
                            return true
                        }
                        return false
                    default:
                        return new Errores("Semantico", "Logico interno or Invalido", this.linea, this.col)
                }
            default:
                return new Errores("Semantico", "Logico or Invalido", this.linea, this.col)
        }
    }

    and(op1: any, op2: any) {
        //validamos que el tipo cumpla con lo requerido 
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.BOOL:
                switch (tipo2) {
                    //unico caso si el primero es bool y el segundo es bool
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (op1 && op2) {
                            return true
                        }
                        return false
                    default:
                        return new Errores("Semantico", "Logico interno and Invalido", this.linea, this.col)
                }
            default:
                return new Errores("Semantico", "Logico and Invalido", this.linea, this.col)
        }
    }

    not(op1: any) {
        //validamos que el tipo cumpla con lo requerido 
        let opU = this.operandoUnico?.tipoDato.getTipo()
        switch (opU) {
            case tipoDato.BOOL:
                this.tipoDato = new Tipo(tipoDato.BOOL)
                //si mi opetador es true 
                if (op1 == true) {
                    //lo niego a false
                    return false
                }
                //de lo contrario sera un false entronces devuelvo un true
                return true
            default:
                return new Errores("Semantico", "Logico interno not Invalido", this.linea, this.col)
        }

    }
}

export enum Logico {
    OR,
    AND,
    NOT
}
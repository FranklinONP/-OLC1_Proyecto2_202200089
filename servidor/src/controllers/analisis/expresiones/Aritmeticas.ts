import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Aritmeticas extends Instruccion {
    private operando1: Instruccion | undefined
    private operando2: Instruccion | undefined
    private operacion: Operadores
    private operandoUnico: Instruccion | undefined

    constructor(operador: Operadores, fila: number, col: number, op1: Instruccion, op2?: Instruccion) {
        super(new Tipo(tipoDato.ENTERO), fila, col)
        this.operacion = operador
        if (!op2) this.operandoUnico = op1
        else {
            this.operando1 = op1
            this.operando2 = op2
        }
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let opIzq, opDer, Unico = null
        if (this.operandoUnico != null) {
            Unico = this.operandoUnico.interpretar(arbol, tabla)
            if (Unico instanceof Errores) return Unico
        } else {
            opIzq = this.operando1?.interpretar(arbol, tabla)
            if (opIzq instanceof Errores) return opIzq
            opDer = this.operando2?.interpretar(arbol, tabla)
            if (opDer instanceof Errores) return opDer
        }

        switch (this.operacion) {
            case Operadores.SUMA:
                return this.suma(opIzq, opDer)
            case Operadores.RESTA:
                return this.resta(opIzq, opDer)
            case Operadores.NEG:
                return this.negacion(Unico)
            case Operadores.MULTIPLICACION:
                return this.multiplicacion(opIzq, opDer)
            case Operadores.DIVISION:
                return this.division(opIzq, opDer)
            case Operadores.POTENCIA:
                return this.potencia(opIzq, opDer)
            case Operadores.MODULO:
                return this.modulo(opIzq, opDer)
            default:
                return new Errores("Semantico", "Operador Aritmetico Invalido", this.linea, this.col)
        }
    }

    suma(op1: any, op2: any) {
        //validamos que el tipo cumpla con lo requerido para una suma ejemplo si se puede sumar entero + bool etc..
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    //caso entero + entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) + parseInt(op2)
                    //caso entero + decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        //.toFixed(2)  <-  indica que redondeara a 2 decimales
                        return (parseFloat(op1) + parseFloat(op2)).toFixed(2)
                    //caso entero + boolean
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        let resop2: number = 1;
                        if (op2 == "false") {
                            resop2 = 0
                        }
                        return parseInt(op1) + resop2
                    //caso entero + caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        //op2.charCodeAt(0); devuelve el numero ascii del caracter en la pos 0 de la cadena en este caso solo sera 1 caracter
                        return parseInt(op1) + op2.charCodeAt(0);
                    //caso entero + cadena
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return String(op1) + String(op2)
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    //caso decimal + entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) + parseFloat(op2)).toFixed(2)
                    //caso decimal + decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) + parseFloat(op2)).toFixed(2)
                    //caso decimal +  booleano
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        let resop2: number = 1;
                        if (op2 == "false") {
                            resop2 = 0
                        }
                        return parseFloat(op1) + resop2
                    //caso decimal + caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) + parseFloat(op2.charCodeAt(0))).toFixed(2);
                    //caso decimal + cadena
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return String(op1) + String(op2)
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.col)
                }
            case tipoDato.BOOL:
                switch (tipo2) {
                    //caso booleano + entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        let resop1E: number = 1;
                        if (op1 == "false") {
                            resop1E = 0
                        }
                        return resop1E + parseInt(op2)
                    //caso booleano + decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        let resop1D: number = 1;
                        if (op1 == "false") {
                            resop1D = 0
                        }
                        return (resop1D + parseFloat(op2)).toFixed(2)
                    //caso booleano + cadena
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        let resop1C: number = 1;
                        if (op1 == "false") {
                            resop1C = 0
                        }
                        return String(resop1C) + String(op2)
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.col)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
                    //caso caracter + entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1.charCodeAt(0)) + parseInt(op2)
                    //caso caracter + decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1.charCodeAt(0)) + parseFloat(op2)).toFixed(2)
                    //caso caracter + caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return String(op1.charCodeAt(0)) + String(op2.charCodeAt(0));
                    //caso caracter + cadena
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return String(op1.charCodeAt(0)) + String(op2)
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.col)
                }
            case tipoDato.CADENA:
                switch (tipo2) {
                    //caso cadena + entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return String(op1) + String(op2)
                    //caso cadena + decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return String(op1) + String(op2)
                    //caso cadena +  booleano
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        let resop2: number = 1;
                        if (op2 == "false") {
                            resop2 = 0
                        }
                        return String(op1) + String(resop2)
                    //caso cadena + caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return String(op1) + String(op2.charCodeAt(0));
                    //caso cadena + cadena
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return String(op1) + String(op2)
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.col)
                }
            default:
                return new Errores("Semantico", "Suma Invalida", this.linea, this.col)
        }

    }

    resta(op1: any, op2: any) {
        //validamos que el tipo cumpla con lo requerido para una resta 
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    //caso entero - entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) - parseInt(op2)
                    //caso entero - decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) - parseFloat(op2)).toFixed(2)
                    //caso entero - booleano
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        let resop2: number = 1;
                        if (op2 == "false") {
                            resop2 = 0
                        }
                        return parseInt(op1) - resop2
                    //caso entero - caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) - op2.charCodeAt(0);
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    //caso decimal - entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return ((parseFloat(op1) - parseFloat(op2))).toFixed(2)
                    //caso decimal - decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return ((parseFloat(op1) - parseFloat(op2))).toFixed(2)
                    //caso decimal - booleano
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        let resop2: number = 1;
                        if (op2 == "false") {
                            resop2 = 0
                        }
                        return parseFloat(op1) - resop2
                    //caso decimal - caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) - parseFloat(op2.charCodeAt(0))).toFixed(2);
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.col)
                }
            case tipoDato.BOOL:
                switch (tipo2) {
                    //caso booleano - entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        let resop1E: number = 1;
                        if (op1 == "false") {
                            resop1E = 0
                        }
                        return resop1E - parseInt(op2)
                    //caso booleano - decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        let resop1D: number = 1;
                        if (op1 == "false") {
                            resop1D = 0
                        }
                        return (resop1D - parseFloat(op2)).toFixed(2)
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.col)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
                    //caso caracter - entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1.charCodeAt(0)) - parseInt(op2)
                    //caso caracter - decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1.charCodeAt(0)) - parseFloat(op2)).toFixed(2)
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.col)
                }
            default:
                return new Errores("Semantico", "Resta Invalida", this.linea, this.col)
        }

    }

    multiplicacion(op1: any, op2: any) {
        //validamos que el tipo cumpla con lo requerido para una multiplicacion 
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    //caso entero * entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) * parseInt(op2)
                    //caso entero * decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) * parseFloat(op2)).toFixed(2)
                    //caso entero * caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) * op2.charCodeAt(0);
                    default:
                        return new Errores("Semantico", "Multiplicacion Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    //caso decimal * entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return ((parseFloat(op1) * parseFloat(op2))).toFixed(2)
                    //caso decimal * decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return ((parseFloat(op1) * parseFloat(op2))).toFixed(2)
                    //caso decimal * caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) * parseFloat(op2.charCodeAt(0))).toFixed(2);
                    default:
                        return new Errores("Semantico", "Multiplicacion Invalida", this.linea, this.col)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
                    //caso caracter * entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1.charCodeAt(0)) * parseInt(op2)
                    //caso caracter * decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1.charCodeAt(0)) * parseFloat(op2)).toFixed(2)
                    default:
                        return new Errores("Semantico", "Multiplicacion Invalida", this.linea, this.col)
                }
            default:
                return new Errores("Semantico", "Multiplicacion Invalida", this.linea, this.col)
        }

    }

    division(op1: any, op2: any) {
        //validamos que el tipo cumpla con lo requerido para una division 
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    //caso entero / entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) / parseFloat(op2)).toFixed(2)
                    //caso entero / decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) / parseFloat(op2)).toFixed(2)
                    //caso entero / caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) / parseFloat(op2.charCodeAt(0))).toFixed(2);
                    default:
                        return new Errores("Semantico", "Division Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    //caso decimal / entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return ((parseFloat(op1) / parseFloat(op2))).toFixed(2)
                    //caso decimal / decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return ((parseFloat(op1) / parseFloat(op2))).toFixed(2)
                    //caso decimal / caracter
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) / parseFloat(op2.charCodeAt(0))).toFixed(2);
                    default:
                        return new Errores("Semantico", "Division Invalida", this.linea, this.col)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
                    //caso caracter / entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1.charCodeAt(0)) / parseFloat(op2)).toFixed(2)
                    //caso caracter / decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1.charCodeAt(0)) / parseFloat(op2)).toFixed(2)
                    default:
                        return new Errores("Semantico", "Division Invalida", this.linea, this.col)
                }
            default:
                return new Errores("Semantico", "Division Invalida", this.linea, this.col)
        }

    }

    potencia(op1: any, op2: any) {
        //validamos que el tipo cumpla con lo requerido para una potencia 
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    //caso entero pow entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return  Math.pow(parseInt(op1), parseInt(op2))
                    //caso entero pow decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (Math.pow(parseFloat(op1),parseFloat(op2))).toFixed(2)
                    default:
                        return new Errores("Semantico", "Potencia Invalida", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    //caso decimal pow entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (Math.pow(parseFloat(op1),parseFloat(op2))).toFixed(2)
                    //caso decimal pow decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (Math.pow(parseFloat(op1),parseFloat(op2))).toFixed(2)
                    default:
                        return new Errores("Semantico", "Potencia Invalida", this.linea, this.col)
                }
            default:
                return new Errores("Semantico", "Potencia Invalida", this.linea, this.col)
        }

    }

    modulo(op1: any, op2: any) {
        //validamos que el tipo cumpla con lo requerido para un modulo 
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    //caso entero % entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) % parseFloat(op2)).toFixed(2)
                    //caso entero % decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return (parseFloat(op1) % parseFloat(op2)).toFixed(2)
                    default:
                        return new Errores("Semantico", "Modulo Invalido", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    //caso decimal % entero
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return ((parseFloat(op1) % parseFloat(op2))).toFixed(2)
                    //caso decimal % decimal
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return ((parseFloat(op1) % parseFloat(op2))).toFixed(2)
                    default:
                        return new Errores("Semantico", "Modulo Invalido", this.linea, this.col)
                }
            default:
                return new Errores("Semantico", "Modulo Invalido", this.linea, this.col)
        }

    }

    negacion(op1: any) {
        let opU = this.operandoUnico?.tipoDato.getTipo()
        switch (opU) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return parseInt(op1) * -1
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.DECIMAL)
                return parseFloat(op1) * -1
            default:
                return new Errores("Semantico", "Negacion Unaria invalida", this.linea, this.col)
        }
    }

}

export enum Operadores {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO,
    NEG
}
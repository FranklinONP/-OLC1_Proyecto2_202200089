import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import Logicos from "../expresiones/ExpLogicas";
import Relacionales from "../expresiones/Relacionales";


export default class Ternario extends Instruccion {
    private comparando: Instruccion        
    private ExpTrue: Instruccion       
    private ExpFalse: Instruccion      

    constructor(cond: Instruccion, T: Instruccion, F: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.comparando = cond
        this.ExpTrue = T
        this.ExpFalse = F
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let condt = this.comparando.interpretar(arbol, tabla)
        if (condt instanceof Errores) return condt
        if (this.comparando instanceof Relacionales) {
            if (condt == true) {
                let obtTipo = this.ExpTrue.tipoDato.getTipo()
                let Verdadero = this.ExpTrue.interpretar(arbol, tabla)
                 switch (obtTipo) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero 
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (Verdadero instanceof Errores) return Verdadero
                        console.log(Verdadero)
                        return Verdadero
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CARACTER)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    case tipoDato.VOID:
                        this.tipoDato = new Tipo(tipoDato.VOID)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    default:
                        return new Errores("Semantico", "Error en el Ternario", this.linea, this.col)
                }
            } else {
                let Falsa = this.ExpFalse.interpretar(arbol, tabla)
                let obtTipo = this.ExpFalse.tipoDato.getTipo()
                switch (obtTipo) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CARACTER)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.VOID:
                        this.tipoDato = new Tipo(tipoDato.VOID)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    default:
                        return new Errores("Semantico", "Error en el ternario", this.linea, this.col)
                }
            }
        } else if (this.comparando instanceof Logicos) {
            if (condt == true) {
                let obtTipo = this.ExpTrue.tipoDato.getTipo()
                let Verdadero = this.ExpTrue.interpretar(arbol, tabla)
                switch (obtTipo) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CARACTER)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    case tipoDato.VOID:
                        this.tipoDato = new Tipo(tipoDato.VOID)
                        if (Verdadero instanceof Errores) return Verdadero
                        return Verdadero
                    default:
                        return new Errores("Semantico", "Error en el ternario", this.linea, this.col)
                }
            } else {
                let Falsa = this.ExpFalse.interpretar(arbol, tabla)
                let obtTipo = this.ExpFalse.tipoDato.getTipo()
                switch (obtTipo) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CARACTER)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    case tipoDato.VOID:
                        this.tipoDato = new Tipo(tipoDato.VOID)
                        if (Falsa instanceof Errores) return Falsa
                        return Falsa
                    default:
                        return new Errores("Semantico", "Error en el ternario", this.linea, this.col)
                }
            }
        //si no es ni Relacional ni Logica retornamos error
        } else {
            return new Errores("Semantico", "Error en el ternario", this.linea, this.col)
        }
    }
    getAST(anterior: string): string {
        let resultado=""
        return resultado
    }
}
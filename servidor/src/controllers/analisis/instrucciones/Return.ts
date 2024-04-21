
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Tipo, { tipoDato } from '../simbolo/Tipo'
import tablaSimbolo from "../simbolo/tablaSimbolos";//import tablaSimbolo from "../simbolo/tablaSimbolos";
import Funcion from "./Funcion"


export default class Return extends Instruccion {
    private exp?: Instruccion
    public valor = null

    constructor(linea: number, columna: number, exp?: Instruccion) {
        super(new Tipo(tipoDato.VOID), linea, columna)
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.exp) {
            let val = this.exp.interpretar(arbol, tabla)
            this.valor = val
            console.log("Valor de return---------------------------------***")
            console.log(val)
            //if(valor instanceof Funcion){}
            if(val instanceof Errores) return val
            this.tipoDato.setTipo(this.exp.tipoDato.getTipo())
            console.log("Valor de return---------------------------------***")
            console.log(this.valor)
        }
        return this
    }

    getAST(anterior: string): string {
        return ""
    }
}
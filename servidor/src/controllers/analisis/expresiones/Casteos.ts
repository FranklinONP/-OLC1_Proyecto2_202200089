import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Aritmeticas extends Instruccion {
    private operacion: Instruccion

    constructor(expCastear: Instruccion, fila: number, col: number) {
        super(new Tipo(tipoDato.ENTERO), fila, col)
        this.operacion = expCastear
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let expresion=this.operacion.interpretar(arbol,tabla)
        console.log(expresion)       
}
}

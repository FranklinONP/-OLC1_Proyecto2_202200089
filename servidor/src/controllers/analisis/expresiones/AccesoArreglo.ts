import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Arreglo from "../simbolo/Arreglo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class AccesoArreglo extends Instruccion {
    private id: string
    private posicion: number

    constructor(id: string, linea: number, col: number,posicion:number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.posicion = posicion
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorVariable: Arreglo = tabla.getArreglo(this.id)
        if (valorVariable == null) return new Errores("SEMANTICO", "Acceso invalido", this.linea, this.col)
        this.tipoDato = valorVariable.getTipo()
        return valorVariable.getValor(this.posicion)
    }
}
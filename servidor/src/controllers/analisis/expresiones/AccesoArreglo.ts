import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Arreglo from "../simbolo/Arreglo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class AccesoArreglo extends Instruccion {
    private id: string
    private posicion: Instruccion

    constructor(id: string, linea: number, col: number,posicion:Instruccion) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.posicion = posicion
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorVariable: Arreglo =<Arreglo> tabla.getArreglo(this.id)
        if (valorVariable == null) return new Errores("SEMANTICO", "Acceso invalido", this.linea, this.col)
        this.tipoDato = valorVariable.getTipo()
        //Interpretar las posiciones
        let pos= this.posicion.interpretar(arbol,tabla)
        //Agregar Manejo de Errores
        console.log("AccesoArreglo.ts")
        console.log("Posicion: "+pos)
        console.log("Valor: "+valorVariable.getValor(pos))
        return valorVariable.getValor(pos)
    }
}
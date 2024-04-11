import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Matriz from "../simbolo/Matriz";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class AccesoMatriz extends Instruccion {
    private id: string
    private pos1: number
    private pos2: number

    constructor(id: string, linea: number, col: number,posicion1:number,posicion2:number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.pos1 = posicion1
        this.pos2 = posicion2
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorVariable: Matriz = tabla.getMatriz(this.id)
        if (valorVariable == null) return new Errores("SEMANTICO", "Acceso invalido", this.linea, this.col)
        this.tipoDato = valorVariable.getTipo()
        console.log("<=============>")
        console.log(valorVariable.getValor(this.pos1,this.pos2))
        console.log("<=============>")
        return valorVariable.getValor(this.pos1,this.pos2).valor
    }
}
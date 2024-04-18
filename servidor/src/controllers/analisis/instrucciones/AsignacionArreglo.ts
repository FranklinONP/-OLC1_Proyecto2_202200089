import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class AsignacionArreglo extends Instruccion {
    private id: string
    private exp: Instruccion
    private pos: number

    constructor(id: string,pos:number, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.exp = exp
        this.pos = pos
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewValor = this.exp.interpretar(arbol, tabla)
        if (NewValor instanceof Errores) return NewValor

        let valor = tabla.getArreglo(this.id.toLocaleLowerCase())
        if (valor == null) return new Errores("SEMANTICO", "Variable no existente", this.linea, this.col)

        if (this.exp.tipoDato.getTipo() != valor.getTipo().getTipo()) return new Errores("SEMANTICO", "Asignacion incorrecta", this.linea, this.col)

        this.tipoDato = valor.getTipo()
        console.log("VALOR: ", NewValor)
        valor.setValor(this.pos,NewValor)


    }
}
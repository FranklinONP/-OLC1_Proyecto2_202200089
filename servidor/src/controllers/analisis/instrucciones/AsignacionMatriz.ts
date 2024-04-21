import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class AsignacionMatriz extends Instruccion {
    private id: string
    private exp: Instruccion
    private pos1: Instruccion
    private pos2: Instruccion

    constructor(id: string,pos1:Instruccion,pos2:Instruccion, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.exp = exp
        this.pos1 = pos1
        this.pos2 = pos2
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewValor = this.exp.interpretar(arbol, tabla)
        if (NewValor instanceof Errores) return NewValor

        let valor = tabla.getMatriz(this.id.toLocaleLowerCase())
        if (valor == null) return new Errores("SEMANTICO", "Variable no existente", this.linea, this.col)

        if (this.exp.tipoDato.getTipo() != valor.getTipo().getTipo()) return new Errores("SEMANTICO", "Asignacion incorrecta", this.linea, this.col)

        this.tipoDato = valor.getTipo()

        //interpreto la posicion
        let pos1 = this.pos1.interpretar(arbol,tabla)
        //Agregar Manejo de Errores
        let pos2 = this.pos2.interpretar(arbol,tabla)
        //Agregar Manejo de Errores


        console.log("Desde AsignacionMatriz.ts")
        console.log("VALOR: ", NewValor)
        console.log("Posiciones Interpretadas: ", this.pos1, this.pos2)
        valor.setValor(pos1,pos2,NewValor)


    }
    getAST(anterior: string): string {
        let resultado="Asignacion Matriz"
        return resultado
    }
}
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class AsignacionVar extends Instruccion {
    private id: string
    private exp: Instruccion

    constructor(id: string, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewValor = this.exp.interpretar(arbol, tabla)
        console.log("Valor interpretado: ", NewValor)
        if (NewValor instanceof Errores) return NewValor
        console.log("1")
        let valor = tabla.getVariable(this.id.toLocaleLowerCase())
        if (valor == null) return new Errores("SEMANTICO", "Variable no existente", this.linea, this.col)
        console.log("2")
        //Esta linea no deberia de borrala pero sino la borro no funciona con el La conversion de caracter a cadena (en arreglos)
        if (this.exp.tipoDato.getTipo() != valor.getTipo().getTipo()) return new Errores("SEMANTICO", "Asignacion incorrecta", this.linea, this.col)
        console.log("3")    
        this.tipoDato = valor.getTipo()
        console.log("Desde asignacion de AsignacionVar: "+NewValor)
        valor.setValor(NewValor)


    }
}
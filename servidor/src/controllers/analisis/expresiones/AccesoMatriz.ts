import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Matriz from "../simbolo/Matriz";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class AccesoMatriz extends Instruccion {
    private id: string
    private pos1: Instruccion
    private pos2: Instruccion

    constructor(id: string, linea: number, col: number,posicion1:Instruccion,posicion2:Instruccion) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.pos1 = posicion1
        this.pos2 = posicion2
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorVariable: Matriz =<Matriz>tabla.getMatriz(this.id)
        if (valorVariable == null) return new Errores("SEMANTICO", "Acceso invalido", this.linea, this.col)
        this.tipoDato = valorVariable.getTipo()

        //Interpretar las posiciones
        let pos1= this.pos1.interpretar(arbol,tabla)
        //Agregar Manejo de Errores
        let pos2=this.pos2.interpretar(arbol,tabla)
        //Agregar Manejo de Errores
/*
        console.log("<=============>")
        console.log(valorVariable.getValor(pos1,this.pos2))
        console.log("<=============>")
*/
        
        return valorVariable.getValor(pos1,pos2)//.valor
    }
}
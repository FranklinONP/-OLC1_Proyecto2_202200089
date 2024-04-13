import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";


export default class ElseIf extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]
    private elif: Instruccion


    constructor(cond: Instruccion, ins: Instruccion[],elif:Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.instrucciones = ins
        this.elif=elif
        console.log("Constructor Else if")
    }
    
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond

        // validacion
        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            return new Errores("SEMANTICO", "La condicion debe ser bool", this.linea, this.col)
        }

        let newTabla = new tablaSimbolo(tabla)
        newTabla.setNombre("Sentencia Else If")

        if (cond) {
            for (let i of this.instrucciones) {
                if (i instanceof Break) return i;
                let resultado = i.interpretar(arbol, newTabla)

            }
        }
        if(this.elif != null) {
            this.elif.interpretar(arbol,tabla)
        }
        

    }
}

/*
if(exp){
    Instrucciones
}

*/
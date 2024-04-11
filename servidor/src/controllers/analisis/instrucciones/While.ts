import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";

/*
while(exp){
    instrucciones
}
*/
export default class While extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]

    constructor(cond: Instruccion, ins: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.instrucciones = ins
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond

        // validaciones
        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            return new Errores("SEMANTICO", "La condicion debe ser bool", this.linea, this.col)
        }

        while (this.condicion.interpretar(arbol, tabla)) {
            let newTabla = new tablaSimbolo(tabla)
            newTabla.setNombre("Sentencia While")
            for (let i of this.instrucciones) {
                if (i instanceof Break) return;
                let resultado = i.interpretar(arbol, newTabla)
                if (resultado instanceof Break) return;
                // los errores les quedan de tarea
            }
        }
    }
}   
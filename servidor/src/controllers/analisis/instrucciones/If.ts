import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";


export default class If extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]


    constructor(cond: Instruccion, ins: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.instrucciones = ins
        console.log("Constructor If")

    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("Entro al interpretar de if")
        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond

        // validacion
        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            return new Errores("SEMANTICO", "La condicion debe ser bool", this.linea, this.col)
        }
/// tablaGlobal s,push(new Tanbla)
        let newTabla = new tablaSimbolo(tabla)
        newTabla.setNombre("Sentencia IF")

        if (cond) {
            for (let i of this.instrucciones) {
                if (i instanceof Break) return i;
                let resultado = i.interpretar(arbol, newTabla)

            }
        }


    }
    getAST(anterior: string): string {
        let resultado=""
        return resultado
    }
}

/*
if(exp){
    Instrucciones
}

*/
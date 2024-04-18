import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import Break from "./Break";

export default class DoWhile extends Instruccion{
    private condicion : Instruccion
    private instrucciones : Instruccion[]

    constructor(cond : Instruccion, inst : Instruccion[], linea: number, columna: number){
        super(new Tipo(tipoDato.VOID), linea, columna)
        this.condicion = cond
        this.instrucciones = inst
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        let cond = this.condicion.interpretar(arbol, tabla)

        if (cond instanceof Errores) return cond

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL){
            return new Errores("Semantico", "Condition DoWhile is not BOOL", this.linea, this.col)
        }

        do{
            let newTabla = new tablaSimbolo(tabla)
            newTabla.setNombre("Sentencia Do-While")
            for(let i of this.instrucciones){
        
                if (i instanceof Break) return;
                
                let resultado = i.interpretar(arbol, newTabla)
                if (resultado instanceof Break) return;
            }
        }while(this.condicion.interpretar(arbol, tabla));
    }
}
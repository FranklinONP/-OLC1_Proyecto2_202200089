import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import Break from "./Break";

export default class For extends Instruccion{
    private declaracionAsignacion : Instruccion
    private condicion : Instruccion
    private actualizacion : Instruccion
    private instrucciones : Instruccion[]

    constructor(decasig : Instruccion, cond : Instruccion, actualiz : Instruccion, inst : Instruccion[], linea: number, columna: number){
        super(new Tipo(tipoDato.VOID), linea, columna)
        this.declaracionAsignacion = decasig
        this.condicion = cond
        this.actualizacion = actualiz
        this.instrucciones = inst
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let decasig = this.declaracionAsignacion.interpretar(arbol, tabla)
        if (decasig instanceof Errores) return decasig

        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond

        let actualiz = this.actualizacion.interpretar(arbol, tabla)
        if (actualiz instanceof Errores) return actualiz 

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL){
            return new Errores("Semantico", "Condicion en For no es booleana", this.linea, this.col)
        }

        let newTabla = new tablaSimbolo(tabla)
        newTabla.setNombre("Sentencia For")
        for(this.declaracionAsignacion.interpretar(arbol,newTabla);this.condicion.interpretar(arbol, newTabla);this.actualizacion.interpretar(arbol,newTabla)){
            for(let i of this.instrucciones){
                if (i instanceof Break) return; 
                let resultado = i.interpretar(arbol, newTabla)
                if (resultado instanceof Break) return;
            }
        }
    }
}
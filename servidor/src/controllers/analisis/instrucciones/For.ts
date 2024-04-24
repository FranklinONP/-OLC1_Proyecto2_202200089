import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import Break from "./Break";
import Declaracion from "./Declaracion";
import AsignacionVar from "./AsignacionVar";

export default class For extends Instruccion{
    private decAsignacion : Instruccion
    private condicion : Instruccion
    private actualizacion : Instruccion
    private instrucciones : Instruccion[]

    constructor(decasig : Instruccion, cond : Instruccion, actualizacion : Instruccion, inst : Instruccion[], linea: number, columna: number){
        super(new Tipo(tipoDato.VOID), linea, columna)
        this.decAsignacion = decasig
        this.condicion = cond
        this.actualizacion = actualizacion
        this.instrucciones = inst
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("entra a for")
        let decasig = this.decAsignacion.interpretar(arbol, tabla)
        console.log("decasig: ", decasig)
        if (decasig instanceof Errores) return decasig
        console.log("decasig: ", decasig)
        //interpreto 1 vez
        let cond = this.condicion.interpretar(arbol, tabla)
        //valido que no me de error
        console.log("cond: ", cond)
        if (cond instanceof Errores) return cond

        let actualizacion = this.actualizacion.interpretar(arbol, tabla)
        console.log("actualizacion: ", actualizacion)
        if (actualizacion instanceof Errores) return actualizacion
        
        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL){
            return new Errores("Semantico", "Condicion en For no es booleana", this.linea, this.col)
        }

        let newTabla = new tablaSimbolo(tabla)
        newTabla.setNombre("Sentencia For")
        for(this.decAsignacion.interpretar(arbol,newTabla);this.condicion.interpretar(arbol, newTabla);this.actualizacion.interpretar(arbol,newTabla)){
            for(let i of this.instrucciones){
                if (i instanceof Break) return;   
                let resultado = i.interpretar(arbol, newTabla)
                if (resultado instanceof Break) return;
            }
        }
    }

    getAST(anterior: string): string {
        return ""
    }
}
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
        //interpreto 1 vez
        let cond = this.condicion.interpretar(arbol, tabla)
        //valido que no me de error
        if (cond instanceof Errores) return cond

        //se valida la condicion
        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL){
            return new Errores("Semantico", "Condition DoWhile is not BOOL", this.linea, this.col)
        }

        //usaremos un Do while donde la condicion sea nuestro metodo interpretar y dentro del do las instrucciones
        do{
            let newTabla = new tablaSimbolo(tabla)
            newTabla.setNombre("Sentencia Do-While")
            for(let i of this.instrucciones){
                //Instruccion Break
                if (i instanceof Break) return;   //si el break viene dentro del ciclo  nada mas
                let resultado = i.interpretar(arbol, newTabla)
                //si el break viene dentro de un if en las instrucciones
                if (resultado instanceof Break) return;
            }
        }while(this.condicion.interpretar(arbol, tabla));
    }
}
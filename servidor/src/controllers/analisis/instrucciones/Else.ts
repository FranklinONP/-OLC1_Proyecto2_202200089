import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";


export default class Else extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]
    private instrucciones2: Instruccion[]


    constructor(cond: Instruccion, ins: Instruccion[],ins2:Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.instrucciones = ins
        this.instrucciones2=ins2

    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond

        // validacion
        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            return new Errores("SEMANTICO", "La condicion debe ser bool", this.linea, this.col)
        }

        let newTabla = new tablaSimbolo(tabla)
        newTabla.setNombre("Sentencia IF")

        if (cond) {
            for (let i of this.instrucciones) {
                if (i instanceof Break) return i;
                let resultado = i.interpretar(arbol, newTabla)
                if (resultado instanceof Break) return;// Se lo acabo de poner
            }
        }else{
            //Interpretar el else
            if(this.instrucciones2){
                for (let i of this.instrucciones2) {
                                if (i instanceof Break) return i;
                                let resultado = i.interpretar(arbol, newTabla)
                                if (resultado instanceof Break) return;

                            }

            }
            
        }


    }
}
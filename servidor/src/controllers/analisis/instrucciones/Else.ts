import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Return from "./Return";


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
        arbol.agregarTabla(newTabla)
        if (cond) {
            for (let i of this.instrucciones) {
                if (i instanceof Break) return i;
                if(i instanceof Return) return i;
                let resultado = i.interpretar(arbol, newTabla)
                if (resultado instanceof Break) return;// Se lo acabo de poner
                if(resultado instanceof Return) return resultado;
            }
        }else{
            if(this.instrucciones2){
                console.log("Instrucciones del else")
                for (let i of this.instrucciones2) {
                        if (i instanceof Break) return i;
                        if(i instanceof Return) return i;
                        let resultado = i.interpretar(arbol, newTabla)
                        if (resultado instanceof Break) return; 
                        if(resultado instanceof Return) return resultado;}
            }
            else{console.log("No hay instrucciones en el else")}
            
        }
    }
    getAST(anterior: string): string {
        let resultado="If"
        return resultado
    }
}
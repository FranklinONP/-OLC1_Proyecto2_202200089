import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Return from "./Return";

import { listaErrores } from "../../../controllers/indexController";


export default class Metodo extends Instruccion {
    public id: string
    public parametros: any[]
    public instrucciones: Instruccion[]
    // public tipoS: string

    constructor( tipo: Tipo,id:string, parametros: any[], instrucciones: Instruccion[], linea:number, columna: number) {
        super(tipo, linea, columna)
        this.id = id
        this.parametros = parametros
        this.instrucciones = instrucciones
        // this.tipoS = ""
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.tipoDato.getTipo() != tipoDato.VOID) return new Errores("Semantico", "El metodo debe de ser de tipo void", this.linea, this.col)
        
            for(let i of this.instrucciones) {
        
                if( i instanceof Errores) {
                    listaErrores.push(i)

                }
        
                let resultado = i.interpretar(arbol, tabla)
        
                if( resultado instanceof Errores) {
                    listaErrores.push(resultado)
                }
        
                    if(resultado instanceof Return) {
                        if(resultado.valor != null) {
                            return new Errores("Semantico", "Un metodo no puede contener un Return", this.linea, this.col)
                        }
                        break
        
                    }

            }

    }
    getAST(anterior: string): string {
        let resultado="Metodo"
        return resultado
    }

}
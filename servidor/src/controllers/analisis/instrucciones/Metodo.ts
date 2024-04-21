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
            // this.tipoS = "Metodo"
                // return new Errores("Semantico", "El metodo debe de ser de tipo void", this.linea, this.columna)
        
            for(let i of this.instrucciones) {
        
                if( i instanceof Errores) {
                    listaErrores.push(i)
                    //arbol..actualizarConsola((<Errores>i).obtenerError())
                }

                // if(i instanceof Return) {
                //     if(i.valor != undefined){
                //         return i.valor
                //     }
                // }
        
                // if(i instanceof Continue) return new Errores("Semantico", "Continue no esta en un ciclo", this.linea, this.columna)
                // if(i instanceof Break) return
        
                let resultado = i.interpretar(arbol, tabla)
        
                if( resultado instanceof Errores) {
                    listaErrores.push(resultado)
                    //arbol.actualizarConsola((<Errores>resultado).obtenerError())
                }
        
                // if(resultado instanceof Break) return
                // if(resultado instanceof Continue) return new Errores("Semantico", "Continue no esta en un ciclo", this.linea, this.columna)
                
                // if(i instanceof Return) {
                    if(resultado instanceof Return) {
                        if(resultado.expresion != null) {
                            // let error = new Errores("Semantico", "No se puede devolver un valor en un metodo", this.linea, this.columna)
                            // listaErrores.push(error)
                            // arbol.actualizarConsola((<Errores>error).obtenerError())
                            return new Errores("Semantico", "No se puede devolver un valor en un metodo", this.linea, this.col)
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
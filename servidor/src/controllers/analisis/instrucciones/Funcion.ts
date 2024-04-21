import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Return from "./Return";

import { listaErrores } from "../../../controllers/indexController";

export default class Funcion extends Instruccion {
    public id: string
    public parametros: any[]
    public instrucciones: Instruccion[]

    constructor( tipo: Tipo,id:string, parametros: any[], instrucciones: Instruccion[], linea:number, columna: number) {
        super(tipo, linea, columna)
        this.id = id
        this.parametros = parametros
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        

        for (let i = 0; i < this.instrucciones.length; i++) {
            let varN = this.instrucciones[i].interpretar(arbol, tabla)

            if(varN instanceof Errores) return varN
            
            if(varN instanceof Return) {
                if(varN.valor != null){
                    if(this.tipoDato.getTipo() != varN.tipoDato.getTipo()) return new Errores("Semantico", "El tipo de la funcion y del valor de retorno son diferentes", this.linea, this.col)
                    return varN.valor
                }
            } 
            if(i == this.instrucciones.length - 1) return new Errores("Semantico", "Debe de retornar un valor", this.linea, this.col)
        }
    }

    getAST(anterior: string): string {
        let resultado="Metodo"
        return resultado
    }

}
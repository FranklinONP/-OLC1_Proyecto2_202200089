
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Nativo from '../expresiones/Nativo'

export default class Cast extends Instruccion{
    private tipo1: Tipo
    private valor: Instruccion
    private tipo2: Tipo


    constructor(tipo2:Tipo,valor:Instruccion,fila: number, col: number) {
        super(new Tipo(tipoDato.CADENA),fila,col)
        this.tipo1= tipo2
        this.valor = valor
        this.tipo2 = tipo2
    
    }
//El tipo que viene en el constructor es el tipo al que se va a convertir
//El tipo que trae valor es el tipo a convertir
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("<====================>")
        let valor = this.valor.interpretar(arbol,tabla)
        console.log("<====================>")
        switch (this.tipo1.getTipo()) {
            case tipoDato.ENTERO:
                
                switch (this.valor.interpretar(arbol,tabla).getTipo()) {
                    case tipoDato.DECIMAL:
                        return parseInt(valor)
                    case tipoDato.CADENA:
                        return parseInt(valor)
                    case tipoDato.CARACTER:
                        return valor.charCodeAt(0);
                    default:
                        return new Errores('Semantico', `No se puede convertir a entero`,this.valor.linea,this.valor.col)
                }
            
            case tipoDato.DECIMAL:
                switch (this.valor.interpretar(arbol,tabla).getTipo()) {
                    case tipoDato.ENTERO:
                        return parseFloat(valor)
                    case tipoDato.CADENA:
                        return parseFloat(valor)
                    default:
                        return new Errores('Semantico', `No se puede convertir a decimal`,this.valor.linea,this.valor.col)
                }

            case tipoDato.CADENA:
                switch (this.valor.interpretar(arbol,tabla).getTipo()) {
                    case tipoDato.ENTERO:
                        return valor.toString()
                    case tipoDato.DECIMAL:
                        return valor.toString()
                    case tipoDato.CARACTER:
                        return valor.toString()
                    default:
                        return new Errores('Semantico', `No se puede convertir a cadena`,this.valor.linea,this.valor.col)
                }
            case tipoDato.CARACTER:
                switch (this.valor.interpretar(arbol,tabla).getTipo()) {
                    case tipoDato.ENTERO:
                        return String.fromCharCode(valor)
                    case tipoDato.CADENA:
                        return valor.charAt(0)
                    default:
                        return new Errores('Semantico', `No se puede convertir a caracter`,this.valor.linea,this.valor.col)
                }

            
        }      
}
getAST(anterior: string): string {
    let resultado="Cast"
    return resultado
}
}

import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import Contador from "../simbolo/Contador";

export default class Println extends Instruccion {
    private expresion: Instruccion

    constructor(exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.expresion = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = this.expresion.interpretar(arbol, tabla)
        if (valor instanceof Errores) return valor
        arbol.Println(valor)
    }
    
    /*
        PRINT, impresion, (, EXPRESION, ), ;
    */

        
         getAST(anterior: string): string {
            let contador = Contador.getInstancia()
            let nodoPrint = `n${contador.get()}`
            let nodoImprimir = `n${contador.get()}`
            let nodoP1 = `n${contador.get()}`
            let nodoExp = `n${contador.get()}`
            let nodoP2 = `n${contador.get()}`
            let nodoP3 = `n${contador.get()}`
            let nodopc = `n${contador.get()}`
    
            let resultado = `${nodoPrint}[label=\"IMPRESION\"];\n`
            resultado += `${nodoImprimir}[label=\"cout\"];\n`
            resultado += `${nodoP1}[label=\"<<\"];\n`
            resultado += `${nodoExp}[label=\"expresion\"];\n`
            resultado += `${nodoP2}[label=\"<<\"];\n`
            resultado += `${nodoP3}[label=\"endl\"];\n`
            resultado += `${nodopc}[label=\";\"];\n`
    
            resultado += `${anterior}->${nodoPrint};\n`
            resultado += `${nodoPrint}->${nodoImprimir};\n`
            resultado += `${nodoPrint}->${nodoP1};\n`
            resultado += `${nodoPrint}->${nodoExp};\n`
            resultado += `${nodoPrint}->${nodoP2};\n`
            resultado += `${nodoPrint}->${nodoP3};\n`
            resultado += `${nodoPrint}->${nodopc};\n`
    
            resultado += this.expresion.getAST(nodoExp)
            return resultado

        }
        
    
}
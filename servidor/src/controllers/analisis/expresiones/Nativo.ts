import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Contador from "../simbolo/Contador";

// enteros y decimales
export default class Nativo extends Instruccion {
    valor: any

    constructor(tipo: Tipo, valor: any, fila: number, col: number) {
        super(tipo, fila, col)
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return this.valor
    }
    
    /*
        Generar un nodo NATIVO, valor
        NATIVO->valor
        anterior->NATIVO

        n10[label=...];\n
    */

    
          getAST(anterior: string): string {
            let contador = Contador.getInstancia()
            let nodoNativo = `n${contador.get()}`
            let nodoValor = `n${contador.get()}`
            let resultado = `${nodoNativo}[label=\"NATIVO\"];\n`
            resultado += `${nodoValor}[label=\"${this.valor}\"];\n`
            resultado += `${nodoNativo}->${nodoValor};\n`
            resultado += `${anterior}->${nodoNativo};\n`
            return resultado
        }
    

  
}
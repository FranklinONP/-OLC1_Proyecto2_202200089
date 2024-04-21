import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Contador from "../simbolo/Contador";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Break extends Instruccion {
    constructor(linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return;
    }

    getAST(anterior: string): string {

        let contador = Contador.getInstancia();
        let result = "";

        let breakk = `n${contador.get()}`;
        let puntocoma = `n${contador.get()}`;


        result += `${breakk}[label="Break"];\n`;
        result += `${puntocoma}[label=";"];\n`;

        result += `${anterior} -> ${breakk};\n`;
        result += `${anterior} -> ${puntocoma};\n`;

        return result;
    }
}
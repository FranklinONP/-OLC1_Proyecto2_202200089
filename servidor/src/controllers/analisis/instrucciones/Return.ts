import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Return extends Instruccion{

    public expresion: Instruccion | undefined;

    constructor(linea:number, columna:number,expresion?: Instruccion){
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log('RETURN---------------');
        console.log(this.expresion);
        if(this.expresion != undefined){
            let result = this.expresion.interpretar(arbol, tabla);
            console.log('RETURN---------------');
            console.log(result);
            this.tipoDato= this.expresion.tipoDato;
            if(result instanceof Errores) return result;
        }
        return this;
    }
    getAST(anterior: string): string {
        let resultado="Return"
        return resultado
    }
}
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from '../simbolo/Tipo'


export default class Metodo extends Instruccion {
    public id: string
    public parametros: any[]
    public instrucciones: Instruccion[]

    constructor(tipo: Tipo,id: string , parametros: any[], instrucciones: Instruccion[], linea: number, col: number){
        super(tipo, linea, col)
        this.id = id
        this.parametros = parametros
        this.instrucciones = instrucciones
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        for(let i of this.instrucciones){
            let resultado = i.interpretar(arbol,tabla)
            //recuperacion de errores
            //el return
        }
    }
}

/*
    id (params):void {
        <Instrucciones>
    }

    miFuncion(std::string id):void{
        cout << id << endl;
        return;
    }

    miFuncion("Hola mundo");
*/
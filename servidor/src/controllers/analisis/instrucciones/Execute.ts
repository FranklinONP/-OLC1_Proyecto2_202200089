import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Declaracion from "./Declaracion";
import Metodo from "./Metodo";

export default class Execute extends Instruccion {
    private id: string
    private parametros: Instruccion[]

    constructor(id: string, parametros: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.parametros = parametros
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let busqueda = arbol.getFuncion(this.id)
        if (busqueda == null) return new Errores("SEMANTICO", "Funcion no existente", this.linea, this.col)

        if (busqueda instanceof Metodo) {
            let newTabla = new tablaSimbolo(arbol.getTablaGlobal())
            newTabla.setNombre("RUN")

            /*
                cantidad de parametros sea igual 
                entre la llamada (run) y la definicion
                de la funcion 
            */
            if (busqueda.parametros.length != this.parametros.length) {
                return new Errores("SEMANTICO", "Parametros invalidos", this.linea, this.col)
            }
            /*
                Usaremos el ciclo con un index para que sea el mismo orden 
                tanto en la definicion como en el run (llamada)

                Declaramos los parametros uno a uno pasando el tipo que deberia
                tener segun la definicion de la funcion y el valor que le
                vamos a asignar al llamarla con run
            */

            // declaramos los parametros
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let declaracionParametro = new Declaracion(
                    busqueda.parametros[i].tipo, this.linea, this.col,
                    busqueda.parametros[i].id, this.parametros[i])

                // declarando parametro de metodo
                let resultado = declaracionParametro.interpretar(arbol, newTabla)
                if (resultado instanceof Errores) return resultado
            }
            // una vez declarados los parametros, interpretamos la funcion
            let resultadoFuncion: any = busqueda.interpretar(arbol, newTabla)
            if (resultadoFuncion instanceof Errores) return resultadoFuncion

        }
    }
    getAST(anterior: string): string {
        let resultado="Execute"
        return resultado
    }
}

/*
 run id(parametros);

 miFuncion(int param1, double param2, bool param3):void{
    cout << param1 << endl;

 }

 miFuncion(1, 2.9, true)

*/
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Declaracion from "./Declaracion";
import Metodo from "./Metodo";

export default class Llamada extends Instruccion {

    private id: string
    private parametros: Instruccion[]

    constructor(id: string, parametros: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.parametros = parametros
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let busqueda = arbol.getFuncion(this.id)
        if (busqueda == null) {
            return new Errores("SEMANTICO", "Funcion no existente", this.linea, this.col)
        }

        if (busqueda instanceof Metodo) {
            let newTabla = new tablaSimbolo(arbol.getTablaGlobal())
            newTabla.setNombre("LLAMADA METODO " + this.id)

            //validacion parametros
            if (busqueda.parametros.length != this.parametros.length) {
                return new Errores("SEMANTICO", "Parametros invalidos", this.linea, this.col)
            }

            // es igual al run en su mayoria :D
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let declaracionParametro = new Declaracion(
                    busqueda.parametros[i].tipo, this.linea, this.col,
                    busqueda.parametros[i].id, this.parametros[i]
                )

                let resultado = declaracionParametro.interpretar(arbol, newTabla)
                if (resultado instanceof Errores) return resultado
            }
            // interpretar la funcion a llamar
            let resultadoFuncion: any = busqueda.interpretar(arbol, newTabla)
            if (resultadoFuncion instanceof Errores) return resultadoFuncion

        }
    }
}
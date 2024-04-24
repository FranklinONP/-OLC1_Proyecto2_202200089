
import AccesoVar from "../expresiones/AccesoVar";

// import MetodoFunciones from "./metodo.funciones";
import Metodo from "./Metodo";
import AsignacionArreglo from "./AsignacionArreglo";

import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import simbolo from "../simbolo/Simbolo";
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Return from "./Return";
import Declaracion from "./Declaracion";
import Funcion from "./Funcion";

import { listaErrores } from "../../../controllers/indexController";

export default class Llamada extends Instruccion {
    private id: string
    private parametros: Instruccion[]

    constructor(id: string, parametros: Instruccion[], linea:number, columna: number){
        super(new Tipo(tipoDato.VOID), linea,columna)
        this.id = id
        this.parametros = parametros
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let busqueda = arbol.getFuncion(this.id)

        if(busqueda == null) return new Errores("Semantico", "La funcion con id: "+this.id+" no existe.", this.linea, this.col)

        this.tipoDato = busqueda.tipoDato

        if(busqueda instanceof Metodo) {
            // if(busqueda.tipoS == "Metodo") {
            let metodo = <Metodo>busqueda
            let tablaN = new tablaSimbolo(tabla)
            tablaN.setNombre("Llamada metodo: "+this.id)

            if(metodo.parametros.length < this.parametros.length) new Errores("Semantico", "Se recibieron mas parametros de los que se esperaban", this.linea, this.col)
            if(metodo.parametros.length > this.parametros.length) new Errores("Semantico", "Se recibieron menos parametros de los que se esperaban", this.linea, this.col)
                
            for (let i = 0; i < metodo.parametros.length; i++) {
                let decla

                    decla = new Declaracion(metodo.parametros[i].tipo, this.linea, this.col, metodo.parametros[i].id, this.parametros[i])

                let resultado = decla.interpretar(arbol, tablaN)
                if(resultado instanceof Errores) return resultado
            }
            // INTERPRETAMOS LA FUNCION A LLAMAR
            let resultadoM: any = metodo.interpretar(arbol, tablaN)
            if(resultadoM instanceof Errores) return resultadoM

        }else if(busqueda instanceof Funcion) {
            let funcion = <Funcion>busqueda
            let tablaN = new tablaSimbolo(tabla)
            tablaN.setNombre("Llamada funcion: "+this.id)

            if(funcion.parametros.length < this.parametros.length) new Errores("Semantico", "Se recibieron mas parametros de los que se esperaban", this.linea, this.col)
            if(funcion.parametros.length > this.parametros.length) new Errores("Semantico", "Se recibieron menos parametros de los que se esperaban", this.linea, this.col)
                
            for (let i = 0; i < funcion.parametros.length; i++) {
                let varN = this.parametros[i].interpretar(arbol, tabla)
                if(varN instanceof Errores) return varN
                let decla

                    decla = new Declaracion(funcion.parametros[i].tipo, this.linea, this.col, funcion.parametros[i].id, this.parametros[i])

                let resultado = decla.interpretar(arbol, tablaN)
                if(resultado instanceof Errores) return resultado


                let variable = tablaN.getVariable(funcion.parametros[i].id[0])

                if(variable != null) {
                    if(variable.getTipo().getTipo() != this.parametros[i].tipoDato.getTipo()) {
                        return new Errores("Semantico", "Parametro "+i+" es de diferente tipo al que se esperaba", this.linea, this.col) 
                    }else{
                        variable.setValor(varN)
                    }
                }else {
                    return new Errores("Semantico", "Varible con ID "+funcion.parametros[i].id[0]+" no existe", this.linea, this.col)
                }
                
            }
            let resultadoF: any = funcion.interpretar(arbol, tablaN)
            if(resultadoF instanceof Errores) return resultadoF
            return resultadoF
        }
    }
    getAST(anterior: string): string {
        return ""
    }
}
import Simbolo from "./Simbolo";
import Arreglo from "./Arreglo";
import Matriz from "./Matriz";
import Tipo, { tipoDato } from './Tipo'

export default class tablaSimbolo {
    private tablaAnterior: tablaSimbolo | any
    private tablaActual: Map<string, Simbolo|Arreglo|Matriz>
    private nombre: string

    constructor(anterior?: tablaSimbolo) {
        this.tablaAnterior = anterior
        this.tablaActual = new Map<string, Simbolo>()
        this.nombre = ""
    }

    public getAnterior(): tablaSimbolo {
        return this.tablaAnterior
    }

    public setAnterior(anterior: tablaSimbolo): void {
        this.tablaAnterior = anterior
    }

    public getTabla(): Map<String, Simbolo|Arreglo|Matriz> {
        return this.tablaActual;
    }

    public setTabla(tabla: Map<string, Simbolo|Arreglo|Matriz>) {
        this.tablaActual = tabla
    }

    public getVariable(id: string) {
        return <Simbolo> this.getTabla().get(id.toLocaleLowerCase())
    }

    public setVariable(simbolo: Simbolo) {
        let busqueda: Simbolo = <Simbolo>this.getTabla().get(simbolo.getId().toLocaleLowerCase())
        if (busqueda == null) {
            this.tablaActual.set(simbolo.getId().toLocaleLowerCase(), simbolo)
            return true
        }
        return false
    }

    public getNombre(): string {
        return this.nombre
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre
    }

    //Arreglos

    public getArreglo(id: string) {
        return <Arreglo> this.getTabla().get(id.toLocaleLowerCase())
    }

    public setArreglo(simbolo: Arreglo) {
        let busqueda: Arreglo = <Arreglo>this.getTabla().get(simbolo.getId().toLocaleLowerCase())
        if (busqueda == null) {
            this.tablaActual.set(simbolo.getId().toLocaleLowerCase(), simbolo)
            return true
        }
        return false
    }    
    //Arreglos [][]

    public getMatriz(id: string) {
        return <Matriz> this.getTabla().get(id.toLocaleLowerCase())
    }

    public setMatriz(simbolo: Matriz) {
        let busqueda: Matriz = <Matriz>this.getTabla().get(simbolo.getId().toLocaleLowerCase())
        if (busqueda == null) {
            this.tablaActual.set(simbolo.getId().toLocaleLowerCase(), simbolo)
            return true
        }
        return false
    }

}
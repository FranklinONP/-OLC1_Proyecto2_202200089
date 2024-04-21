import tablaSimbolo from "./tablaSimbolos";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Metodo from "../instrucciones/Metodo";
import Funcion from "../instrucciones/Funcion"
import * as fs from 'fs';



export default class Arbol {
    private instrucciones: Array<Instruccion>
    private consola: string
    private tablaGlobal: tablaSimbolo
    private errores: Array<Errores>
    private funciones: Array<Instruccion>

    private lista_tablas: Array<tablaSimbolo>

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones
        this.consola = ""
        this.tablaGlobal = new tablaSimbolo()
        this.errores = new Array<Errores>
        this.funciones = new Array<Instruccion>()
        this.lista_tablas = []
    }
    public agregarTabla(tabla: tablaSimbolo) {
        this.lista_tablas.push(tabla)
    }
    
    public generarReporteTablas(): void {
        let html = 
        `<html>
        <head>
            <title>Reporte de Tablas de Símbolos</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    text-align: center;
                }
                table {
                    margin: 0 auto;
                    border: 1px solid black;
                    border-collapse: collapse;
                    width: 80%;
                    background-color: white;
                }
                th, td {
                    border: 1px solid black;
                    padding: 10px;
                }
            </style>
        </head>
        <body>
            <h1>Reporte de Tablas de Símbolos</h1>`;
            
        for (let ins of this.lista_tablas) {
            html += `<h2>Tabla: ${ins.getNombre()}</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Fila</th>
                    <th>Columna</th>
                </tr>`;
            let v=0;
            ins.getTabla().forEach((valor, clave) => {
                html += `
                <tr>
                    <td>${clave}</td>
                    <td>${valor.getTipo().getNombreTipo()}</td>
                    <td>${valor.getValor()}</td>
                    <td>${v}</td>
                    <td>${v+1}</td>
                </tr>`;
                v=v+1;
            });
            html += `</table>`;
        }
        html += `</body></html>`;
        fs.writeFileSync('ReporteTablas.html', html);
    }

    public Print(contenido: any) {

        this.consola = `${this.consola}${contenido}`;
    }

    public Println(contenido: any) {
        this.consola = `${this.consola}${contenido}\n`;
    }


    public getConsola(): string {
        return this.consola
    }

    public setConsola(console: string): void {
        this.consola = console
    }

    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones
    }

    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones
    }

    public getTablaGlobal(): tablaSimbolo {
        return this.tablaGlobal
    }

    public setTablaGlobal(tabla: tablaSimbolo) {
        this.tablaGlobal = tabla
    }

    public getErrores(): any {
        return this.errores
    }
    public getFunciones() {
        return this.funciones
    }

    public setFunciones(funciones: Array<Instruccion>) {
        this.funciones = funciones
    }

    public addFunciones(funcion: Instruccion) {
        this.funciones.push(funcion)
    }

    public getFuncion(id: string) {
        for (let i of this.getFunciones()) {
            if (i instanceof Metodo) {
                if (i.id.toLocaleLowerCase() == id.toLocaleLowerCase()) return i
            }
            if(i instanceof Funcion) {
                if(i.id.toLocaleLowerCase()==id.toLocaleLowerCase()) return i
            }
        }
        return null
    }
    
}
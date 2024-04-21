import { Request, Response } from 'express';
import Arbol from './analisis/simbolo/Arbol';
import tablaSimbolo from './analisis/simbolo/tablaSimbolos';
import  Errores  from './analisis/excepciones/Errores';
import Declaracion from './analisis/instrucciones/Declaracion';
import DeclaracionArreglo from './analisis/instrucciones/DeclaracionArreglo';
import DeclaracionMatriz from './analisis/instrucciones/DeclaracionMatriz';
import Metodo from './analisis/instrucciones/Metodo';
import Execute from './analisis/instrucciones/Execute';
import * as path from 'path';
import Contador from './analisis/simbolo/Contador';
import Funcion from './analisis/instrucciones/Funcion'


export let listaErrores : Array<Errores> = []

var AstDot: string

class controller {
    public prueba(req: Request, res: Response) {
        res.json({ "funciona": "la api" });
    }

    public interpretar(req: Request, res: Response) {
        listaErrores = new Array<Errores>
        try {
            AstDot = ""
            let parser = require('./analisis/analizador')
            let ast = new Arbol(parser.parse(req.body.entrada))
            let tabla = new tablaSimbolo()
            tabla.setNombre("Ejemplo1")
            ast.setTablaGlobal(tabla)
            ast.setConsola("")

            for(let m of ast.getInstrucciones()){
                if(m instanceof Errores){
                    listaErrores.push(m)
                }
            }

            let execute=null;

            console.log("Empieza")
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Metodo|| i instanceof Funcion) {
                    console.log("Metodo|Funcion")
                    console.log(i.id)
                    i.id = i.id.toLocaleLowerCase()
                    ast.addFunciones(i)
                    console.log("Sale metodo")
                }
                //if(i instanceof Funcion){

                
                if(i instanceof Declaracion){
                    i.interpretar(ast, tabla)
                    // manejo de errores
                }
                if(i instanceof DeclaracionArreglo){
                    i.interpretar(ast, tabla)
                    // manejo de errores
                }
                if(i instanceof DeclaracionMatriz){
                    i.interpretar(ast, tabla)
                    // manejo de errores
                }
                if (i instanceof Execute){
                    execute = i
                   
                }
            }
            console.log("Termina")
            if(execute != null){
                console.log("Ejecutar")
                execute.interpretar(ast,tabla)
                console.log(tabla)
                // manejo de errores   
            }

            let contador = Contador.getInstancia()
            let cadena = "digraph ast{\n"
            cadena += "nINICIO[label=\"INICIO\"];\n"
            cadena += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n"
            cadena += "nINICIO->nINSTRUCCIONES;\n"

            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores) continue
                let nodo = `n${contador.get()}`
                cadena += `${nodo}[label=\"INSTRUCCION\"];\n`
                cadena += `nINSTRUCCIONES->${nodo};\n`
                cadena += i.getAST(nodo)
            }
            cadena += "\n}"
            AstDot = cadena
            //Vuelvo a recorrer para encontrar errores
            console.log(tabla)
            console.log(listaErrores)
            res.send({ "Respuesta": ast.getConsola() })
        } catch (err: any) {
            console.log(err)
            res.send({ "Error": "Ya no sale compi1" })
        }
    }

    public ast(req: Request, res: Response) {
        res.json({ "AST": AstDot })
    }

    public getErrores(req: Request, res: Response) {
        try {
            console.log(listaErrores)
            res.json({ "listaErrores": listaErrores })
        } catch (err: any) {    
            res.send({ "Error": "Ya no sale compi2" })
        }
    }
    public generar_reporte_tablas(req: Request, res: Response) {
        try {
            let parser = require('./analisis/analizador')
            let ArbolAst = new Arbol(parser.parse(req.body.entrada))
            let Tabla_Simbolos = new tablaSimbolo()
            Tabla_Simbolos.setNombre("Tabla Global")
            ArbolAst.setTablaGlobal(Tabla_Simbolos)
            ArbolAst.agregarTabla(Tabla_Simbolos)
            ArbolAst.setConsola("")
            for (let i of ArbolAst.getInstrucciones()) {
                var resultado = i.interpretar(ArbolAst, Tabla_Simbolos)
            }
            ArbolAst.generarReporteTablas()
            res.sendFile(path.resolve('ReporteTablas.html'));
        } catch (err: any) {
            console.log(err)
            res.send({ "Error": "Error Al Generar Reporte De Tablas De Simbolos." })
        }
    }

}


export const indexController = new controller();
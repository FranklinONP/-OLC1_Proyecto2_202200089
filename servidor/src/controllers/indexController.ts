import { Request, Response } from 'express';
import Arbol from './analisis/simbolo/Arbol';
import tablaSimbolo from './analisis/simbolo/tablaSimbolos';
import  Errores  from './analisis/excepciones/Errores';
import Declaracion from './analisis/instrucciones/Declaracion';
import DeclaracionArreglo from './analisis/instrucciones/DeclaracionArreglo';
import DeclaracionMatriz from './analisis/instrucciones/DeclaracionMatriz';
import Metodo from './analisis/instrucciones/Metodo';
import Execute from './analisis/instrucciones/Execute';

import Contador from './analisis/simbolo/Contador';

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

            let execute=null;

            console.log("Empieza")
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Metodo) {
                    console.log("Metodo")
                    console.log(i.id)
                    i.id = i.id.toLocaleLowerCase()
                    ast.addFunciones(i)
                    console.log("Sale metodo")
                }
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
            //Vuelvo a recorrer para encontrar errores
            console.log(tabla)
            console.log(listaErrores)
            res.send({ "Respuesta": ast.getConsola() })
        } catch (err: any) {
            console.log(err)
            res.send({ "Error": "Ya no sale compi1" })
        }
    }

    public getErrores(req: Request, res: Response) {
        try {
            console.log(listaErrores)
            res.json({ "listaErrores": listaErrores })
        } catch (err: any) {    
            res.send({ "Error": "Ya no sale compi2" })
        }
    }

}


export const indexController = new controller();
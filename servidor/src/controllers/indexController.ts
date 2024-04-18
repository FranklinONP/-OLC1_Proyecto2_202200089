import { Request, Response } from 'express';
import Arbol from './analisis/simbolo/Arbol';
import tablaSimbolo from './analisis/simbolo/tablaSimbolos';
import  Errores  from './analisis/excepciones/Errores';

export let listaErrores : Array<Errores> = []

class controller {
    public prueba(req: Request, res: Response) {
        res.json({ "funciona": "la api" });
    }

    public interpretar(req: Request, res: Response) {
        listaErrores = new Array<Errores>
        try {
            let parser = require('./analisis/analizador')
            let ast = new Arbol(parser.parse(req.body.entrada))
            let tabla = new tablaSimbolo()
            tabla.setNombre("Ejemplo1")
            ast.setTablaGlobal(tabla)
            ast.setConsola("")
            for (let i of ast.getInstrucciones()) {
                if(i instanceof Errores) {
                    listaErrores.push(i)
                }
                var resultado = i.interpretar(ast, tabla)
                if (resultado instanceof Errores) {
                    listaErrores.push(resultado)
                }
            }
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
        
            res.json({ "listaErrores": listaErrores })
        } catch (err: any) {    
            res.send({ "Error": "Ya no sale compi2" })
        }
    }

}


export const indexController = new controller();